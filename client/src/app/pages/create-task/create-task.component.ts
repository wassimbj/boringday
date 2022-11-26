import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/types';
import { FormBuilder } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';
import { parseISO } from 'date-fns';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private taskService: TasksService,
    private toast: HotToastService,
    private formBuilder: FormBuilder,
    private emoji: EmojiService
  ) {}

  categories!: Category[];
  taskForm = this.formBuilder.group({
    title: '',
    category: '1',
    notes: '',
    date: null,
    time: null,
  });

  ngOnInit(): void {
    this.getCats();
  }

  getEmojiFromName(name: string) {
    return this.emoji.getData(name, undefined, 'twitter')?.native;
  }

  isSubmitButtonDisabled(): boolean {
    return (
      !this.taskForm.value.title ||
      !this.taskForm.value.date ||
      !this.taskForm.value.time ||
      !this.taskForm.value.category
    );
  }

  getCats() {
    return this.categoryService.getCategories().subscribe((data) => {
      console.log(data);
      this.categories = data;
    });
  }

  onSubmit(): void {
    const { category, date, notes, time, title } = this.taskForm.value;
    // this.taskForm.valid
    console.log(this.taskForm.value);
    if (!title || !date || !time) {
      console.log('Empty fields');
      return;
    }
    const dateTime = parseISO(`${date} ${time}`);
    console.log(dateTime);
    this.taskService
      .createTask({
        category: Number.parseInt(category || '1'),
        dateTime,
        notes: notes || '',
        title: title || '',
      })
      .pipe(
        this.toast.observe({
          loading: 'Creating task...',
          error: 'Oops, something went wrong',
          success: 'Task has been successfully created 🎉',
        }),
        catchError((error) => of(error))
      )
      .subscribe(() => {
        this.taskForm.reset();
      });
  }
}
