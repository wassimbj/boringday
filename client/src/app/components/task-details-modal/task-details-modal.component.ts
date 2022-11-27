import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/types';

@Component({
  selector: 'app-task-details-modal',
  templateUrl: './task-details-modal.component.html',
  styleUrls: ['./task-details-modal.component.css'],
})
export class TaskDetailsModalComponent implements OnInit {
  constructor() {}

  @Input() taskId!: number;

  task = {
    title: "OK"
  }

  ngOnInit(): void {}
}
