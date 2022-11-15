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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  currentMonth = new Date();
  currentWeek = getWeek(this.currentMonth);

  rows: Array<any> = [];
  selectedDate = new Date();
  renderWeekCells() {
    let startDate = startOfWeek(this.currentMonth, { weekStartsOn: 1 });
    let endDate = lastDayOfWeek(this.currentMonth, { weekStartsOn: 1 });
    let days: Array<any> = [];
    let day = startDate;
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        // const cloneDay = day;
        days.push({
          dayDate: format(day, 'd'),
          dayName: format(day, 'eee'), // Mon - Sun
          isToday: isSameDay(day, new Date()),
          isSelectedDate: isSameDay(day, this.selectedDate),
          day,
        });
        day = addDays(day, 1);
      }
      this.rows = days;
      days = [];
    }
  }

  handleSelectDate(date: Date) {
    console.log(date);
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

  ngOnInit(): void {
    this.renderWeekCells();
  }
}
