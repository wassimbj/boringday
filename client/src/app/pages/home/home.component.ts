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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private tasksService: TasksService) {}

  currentMonth = new Date();
  currentWeek = getWeek(this.currentMonth);

  weekCells: Array<any> = [];
  selectedDate = new Date();

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

  handleSelectDate(date: Date) {
    console.log(date);
    this.selectedDate = date;
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
        console.log(data);
      });
  }
}
