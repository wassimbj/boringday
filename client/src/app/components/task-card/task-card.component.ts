import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/types';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent implements OnInit {
  constructor(private taskService: TasksService) {}

  @Output() onDelete = new EventEmitter<string>();
  @Input() task!: Task;
  ngOnInit(): void {}
  newDate(d?: string | Date): Date {
    if (d) {
      return new Date(d);
    }
    return new Date();
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.onDelete.emit();
    });
  }
}
