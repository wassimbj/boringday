import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/types';

@Component({
  selector: 'app-task-details-modal',
  templateUrl: './task-details-modal.component.html',
  styleUrls: ['./task-details-modal.component.css'],
})
export class TaskDetailsModalComponent implements OnInit {
  constructor(private taskService: TasksService) {}

  @Input() taskId!: number;

  task!: Task;

  newDate(d?: string | Date): Date {
    if (d) {
      return new Date(d);
    }
    return new Date();
  }

  ngOnInit(): void {
    this.taskService.getTaskById(this.taskId).subscribe((data) => {
      this.task = data;
    });
  }
}
