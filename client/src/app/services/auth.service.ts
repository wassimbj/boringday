import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, CreateTaskBody, Task, UserData } from '../types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login({ email, password }: UserData): Observable<any> {
    return this.http.post(
      `${environment.serverUrl}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }

  register({ email, password, fullname }: UserData): Observable<any> {
    return this.http.post(
      `${environment.serverUrl}/auth/join`,
      {
        email,
        password,
        fullname,
      },
      {
        withCredentials: true,
      }
    );
  }

  getLoggedInUser(): Observable<any> {
    return this.http.get(`${environment.serverUrl}/auth/me`, {
      withCredentials: true,
    });
  }
}
