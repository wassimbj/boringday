import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  getWeek,
  addWeeks,
  subWeeks,
  isSameMonth,
  isSameYear,
} from 'date-fns';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/types';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  currentMonth = new Date();
  currentWeek = getWeek(this.currentMonth);
  @Output() onSelectDate = new EventEmitter<string>();

  weekCells: Array<any> = [];
  selectedDate = new Date();
  tasksOfEachDay: Array<{ date: Date; _count: { id: number } }> = [];

  isSameDate(d1: Date, d2: Date) {
    return isSameDay(d1, d2) && isSameMonth(d1, d2) && isSameYear(d1, d2);
  }
  renderWeekCells() {
    let startDate = startOfWeek(this.currentMonth, { weekStartsOn: 1 });
    let days: Array<any> = [];
    let day = startDate;
    for (let i = 0; i < 7; i++) {
      let totalTasks = this.tasksOfEachDay.find((item) =>
        this.isSameDate(new Date(item.date), day)
      );
      days.push({
        dayDate: format(day, 'd'),
        dayName: format(day, 'eee'), // Mon - Sun
        isToday: isSameDay(day, new Date()),
        isSelectedDate: isSameDay(day, this.selectedDate),
        hasTasksTodo: !totalTasks ? false : totalTasks?._count.id > 0,
        day,
      });
      day = addDays(day, 1);
    }
    this.weekCells = days;
    days = [];
  }

  refreshCalendar() {
    this.getWeekDatesTasks(this.selectedDate);
  }

  isTasksEmpty(arr: Array<Task>) {
    return arr.length;
  }

  handleSelectDate(date: Date) {
    this.selectedDate = date;
    this.onSelectDate.emit(String(date));
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
    this.getWeekDatesTasks(this.currentMonth);
  }

  handleChangeMonth(btnType: 'prev' | 'next') {
    if (btnType === 'prev') {
      this.currentMonth = subMonths(this.currentMonth, 1);
    }
    if (btnType === 'next') {
      this.currentMonth = addMonths(this.currentMonth, 1);
    }
    this.getWeekDatesTasks(this.currentMonth);
  }

  ngOnInit(): void {
    this.getWeekDatesTasks(this.selectedDate);
  }

  getWeekDatesTasks(selectedDate: Date) {
    this.tasksService
      .getNumberOfTasksForEachDay(selectedDate)
      .subscribe((data) => {
        this.tasksOfEachDay = data;
        this.renderWeekCells();
      });
  }
}
