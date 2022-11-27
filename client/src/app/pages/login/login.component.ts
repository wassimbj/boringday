import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  onSubmit() {
    this.authService
      .login({
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      })
      .subscribe((res) => {
        // this.router.navigateByUrl('/');
        window.location.href = '/';
      });
  }
}
