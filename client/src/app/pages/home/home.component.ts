import { Component, OnInit } from '@angular/core';
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from 'date-fns';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  currentMonth = new Date();
  currentWeek = getWeek(this.currentMonth);

  tasks: { isLoading: boolean; items: Task[] } = {
    isLoading: true,
    items: [],
  };
  weekCells: Array<any> = [];
  selectedDate = new Date();

  newDate(d: string | Date): Date {
    return new Date(d);
  }

  renderWeekCells() {
    let startDate = startOfWeek(this.currentMonth, { weekStartsOn: 1 });
    let days: Array<any> = [];
    let day = startDate;
    for (let i = 0; i < 7; i++) {
      days.push({
        dayDate: format(day, 'd'),
        dayName: format(day, 'eee'), // Mon - Sun
        isToday: isSameDay(day, new Date()),
        isSelectedDate: isSameDay(day, this.selectedDate),
        day,
      });
      day = addDays(day, 1);
    }
    this.weekCells = days;
    days = [];
  }

  isTasksEmpty(arr: Array<Task>) {
    return arr.length;
  }

  handleSelectDate(date: Date) {
    this.selectedDate = date;
    this.getTasks(date);
    this.tasks.isLoading = true;
    this.renderWeekCells();
  }

  handleChangeWeek(btnType: 'prev' | 'next') {
    if (btnType === 'prev') {
      this.currentMonth = subWeeks(this.currentMonth, 1);
      this.currentWeek = getWeek(subWeeks(this.currentMonth, 1));
    }
    if (btnType === 'next') {
      this.currentMonth = addWeeks(this.currentMonth, 1);
      this.currentWeek = getWeek(addWeeks(this.currentMonth, 1));
    }
    this.renderWeekCells();
  }

  handleChangeMonth(btnType: 'prev' | 'next') {
    if (btnType === 'prev') {
      this.currentMonth = subMonths(this.currentMonth, 1);
    }
    if (btnType === 'next') {
      this.currentMonth = addMonths(this.currentMonth, 1);
    }
    this.renderWeekCells();
  }

  ngOnInit(): void {
    this.renderWeekCells();
    this.getTasks(this.selectedDate);
  }

  getTasks(selectedDate: Date) {
    this.tasksService
      .getTasksByDate(format(selectedDate, 'yyyy-MM-dd'))
      .subscribe((data) => {
        this.tasks = { isLoading: false, items: data };
        console.log(data);
      });
  }
}
