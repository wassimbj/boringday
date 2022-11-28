import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  isSubmitBtnDisabled(): boolean {
    return !this.loginForm.value.email || !this.loginForm.value.password;
  }

  onSubmit() {
    this.authService
      .login({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      })
      .subscribe({
        error: (err) => {
          if (err?.status >= 500) {
            this.toast.error('Something went wrong, please try again later');
          } else {
            this.toast.warning('Wrong email or password');
          }
        },
        next: () => {
          // this.router.navigateByUrl('/');
          window.location.href = '/';
        },
      });
  }
}
