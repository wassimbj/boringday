import { EmojiService } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { format, parse, parseISO } from 'date-fns';
import { catchError, of } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Category, Task } from 'src/app/types';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  // ngOnInit(): void {
  //   console.log(this.route.snapshot.paramMap.get('id'));
  // }
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private taskService: TasksService,
    private formBuilder: FormBuilder,
    private emoji: EmojiService
  ) {}

  categories!: Category[];
  taskId!: number;
  taskForm = this.formBuilder.group({
    title: '',
    category: '1',
    id: 0,
    notes: '',
    date: '',
    time: '',
  });

  ngOnInit(): void {
    this.getCats();
    this.taskId = Number.parseInt(
      this.route.snapshot.paramMap.get('id') || '0'
    );
    this.getTaskToEdit(this.taskId);
  }

  newDate(d?: string | Date): Date {
    if (d) {
      return new Date(d);
    }
    return new Date();
  }

  getTaskToEdit(id: number) {
    this.taskService.getTaskById(id).subscribe((task: Task) => {
      this.taskForm.setValue({
        category: String(task.categoryId || 1),
        notes: task.notes,
        id: task.id,
        title: task.title,
        time: format(new Date(task.time), 'HH:mm'),
        date: format(new Date(task.date), 'yyyy-MM-dd'),
      });
    });
  }

  isSubmitButtonDisabled(): boolean {
    return (
      !this.taskForm.value.title ||
      !this.taskForm.value.date ||
      !this.taskForm.value.time ||
      !this.taskForm.value.category ||
      !this.taskForm.dirty
    );
  }

  getCats() {
    return this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  getEmojiFromName(name: string) {
    return this.emoji.getData(name, undefined, 'twitter')?.native;
  }

  onSubmit(): void {
    const { category, date, notes, time, title } = this.taskForm.value;
    if (!title || !date || !time) {
      return;
    }

    const dateTime = parseISO(`${date} ${time}`);
    console.log(dateTime);
    this.taskService
      .updateTask({
        category: Number.parseInt(category || '1'),
        dateTime,
        id: this.taskId,
        notes: notes || '',
        title: title || '',
      })
      .pipe(
        this.toast.observe({
          loading: 'Updating task...',
          error: 'Oops, something went wrong',
          success: 'Task has been updated successfully 😁',
        }),
        catchError((error) => of(error))
      )
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
