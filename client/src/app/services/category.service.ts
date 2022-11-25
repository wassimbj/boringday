import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, CreateTaskBody, Task } from '../types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  createCategory(data: Category): Observable<any> {
    return this.http.post(`${environment.serverUrl}/category/create`, data);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${environment.serverUrl}/categories`);
  }

  updateCategory(data: Category): Observable<any> {
    return this.http.post(`${environment.serverUrl}/category/update`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.get(`${environment.serverUrl}/category/delete/${id}`);
  }
  
}
