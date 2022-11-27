import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTaskBody, Task } from '../types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getTasksByDate(date: string): Observable<any> {
    return this.http.get(`${environment.serverUrl}/tasks/${date}`);
  }

  createTask(task: CreateTaskBody): Observable<any> {
    return this.http.post(`${environment.serverUrl}/task/create`, task);
  }

  getNumberOfTasksForEachDay(date: Date): Observable<any> {
    return this.http.get(`${environment.serverUrl}/tasks/week/${date}`);
  }

  updateTask(task: CreateTaskBody): Observable<any> {
    return this.http.post(`${environment.serverUrl}/task/update`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.get(`${environment.serverUrl}/task/delete/${id}`);
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(`${environment.serverUrl}/task/${id}`);
  }

  getTasksByCategory(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.serverUrl}/tasks/c/${id}`);
  }
}
