import { AfterViewInit, Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  tasks: { isLoading: boolean; items: Task[] } = {
    isLoading: true,
    items: [],
  };
  selectedDate = new Date();
  tasksOfEachDay: Array<{ date: Date; _count: { id: number } }> = [];

  handleSelectDate($event: string) {
    this.selectedDate = new Date($event);
    this.getTasks(new Date($event));
  }
  newDate(d?: string | Date): Date {
    if (d) {
      return new Date(d);
    }
    return new Date();
  }

  ngOnInit(): void {
    this.getTasks(this.selectedDate);
  }

  refreshTasks() {
    console.log('Refreshing...');
    this.tasks.isLoading = true;
    this.getTasks(this.selectedDate);
  }

  getTasks(selectedDate: Date) {
    this.tasksService
      .getTasksByDate(format(selectedDate, 'yyyy-MM-dd'))
      .subscribe((data) => {
        this.tasks = { isLoading: false, items: data };
      });
  }
}
