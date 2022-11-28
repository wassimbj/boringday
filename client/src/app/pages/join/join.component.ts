import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
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
    private toast: HotToastService // private router: Router
  ) {}

  ngOnInit(): void {}

  joinForm = this.formBuilder.group({
    fullname: '',
    email: '',
    password: '',
  });

  isSubmitBtnDisabled(): boolean {
    return (
      !this.joinForm.value.email ||
      !this.joinForm.value.password ||
      !this.joinForm.value.fullname
    );
  }

  onSubmit() {
    this.authService
      .register({
        fullname: this.joinForm.value.fullname!,
        email: this.joinForm.value.email!,
        password: this.joinForm.value.password!,
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
          window.location.href = '/';
        },
      });
  }
}
