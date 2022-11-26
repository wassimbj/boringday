import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { parseISO } from 'date-fns';
import { CategoryService } from 'src/app/services/category.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Category } from 'src/app/types';

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
    private taskService: TasksService,
    private formBuilder: FormBuilder
  ) {}

  categories!: Category[];
  taskForm = this.formBuilder.group({
    title: '',
    category: 1,
    notes: '',
    date: null,
    time: null,
  });

  ngOnInit(): void {
    this.getCats();
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
    console.log();
    const { category, date, notes, time, title } = this.taskForm.value;
    if (!title || !date || !time) {
      return;
    }
    const dateTime = parseISO(`${date} ${time}`);
    console.log(dateTime);
    this.taskService
      .createTask({
        category: category || 1,
        dateTime,
        notes: notes || '',
        title: title || '',
      })
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
