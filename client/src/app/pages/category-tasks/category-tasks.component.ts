import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isSameDay, isSameMonth, isSameYear, parseISO } from 'date-fns';
import { CategoryService } from 'src/app/services/category.service';
import { TasksService } from 'src/app/services/tasks.service';
import { Category, Task } from 'src/app/types';

@Component({
  selector: 'app-category-tasks',
  templateUrl: './category-tasks.component.html',
  styleUrls: ['./category-tasks.component.css'],
})
export class CategoryTasksComponent implements OnInit {
  constructor(
    private tasksService: TasksService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  categoryId!: number;
  ngOnInit(): void {
    this.categoryId = Number.parseInt(
      this.route.snapshot.paramMap.get('id') || '0'
    );
    this.getTasks(this.categoryId);
    this.getCategoryDetails(this.categoryId);
  }
  tasks: { isLoading: boolean; items: Task[] } = {
    isLoading: true,
    items: [],
  };
  categoryDetails: Category | undefined = undefined;
  dateOfTasks = new Date();

  isSameDate(d1: Date, d2: Date) {
    const d1Parsed = this.newDate(d1);
    const d2Parsed = this.newDate(d2);
    return (
      isSameDay(d1Parsed, d2Parsed) &&
      isSameMonth(d1Parsed, d2Parsed) &&
      isSameYear(d1Parsed, d2Parsed)
    );
  }

  newDate(d: Date | string): Date {
    return new Date(d);
  }

  updateDateOfTasks(d: Date): boolean {
    this.dateOfTasks = d;
    return true;
  }

  refreshTasks() {
    this.getTasks(this.categoryId);
  }

  getCategoryDetails(id: number) {
    this.categoryService.getCategoryById(id).subscribe((data) => {
      this.categoryDetails = data;
    });
  }

  getTasks(id: number) {
    this.tasksService.getTasksByCategory(id).subscribe((data) => {
      this.tasks = { isLoading: false, items: data };
    });
  }
}
