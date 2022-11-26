import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { format } from 'date-fns';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private tasksService: TasksService) {}
  @ViewChild(CalendarComponent) calendar!: CalendarComponent;

  tasks: { isLoading: boolean; items: Task[] } = {
    isLoading: true,
    items: [],
  };
  selectedDate = new Date();
  tasksOfEachDay: Array<{ date: Date; _count: { id: number } }> = [];
  // @Input() onRefreshTasks = new EventEmitter()

  handleSelectDate($event: string) {
    this.selectedDate = new Date($event);
    this.getTasks(new Date($event));
  }

  ngOnInit(): void {
    this.getTasks(this.selectedDate);
  }

  ngAfterViewInit(): void {
    this.calendar.refreshCalendar();
  }

  refreshTasks() {
    console.log('Refreshing...');
    this.tasks.isLoading = true;
    this.getTasks(this.selectedDate);
    this.ngAfterViewInit();
  }

  getTasks(selectedDate: Date) {
    this.tasksService
      .getTasksByDate(format(selectedDate, 'yyyy-MM-dd'))
      .subscribe((data) => {
        this.tasks = { isLoading: false, items: data };
      });
  }
}
