import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css'],
})
export class JoinComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  joinForm = this.formBuilder.group({
    fullname: '',
    email: '',
    password: '',
  });

  onSubmit() {
    this.authService
      .register({
        fullname: this.joinForm.value.fullname!,
        email: this.joinForm.value.email!,
        password: this.joinForm.value.password!,
      })
      .subscribe((res) => {
        window.location.href = '/';
      });
  }
}
