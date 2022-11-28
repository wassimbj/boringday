import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {
    // this.checkLoggedInUser();
  }

  loggedInUser: { fullname: string; id: number } | null = null;

  ngOnInit(): void {
    this.checkLoggedInUser();
  }

  checkLoggedInUser() {
    this.authService.getLoggedInUser().subscribe({
      error: () => {
        this.loggedInUser = null;
      },
      next: (data) => {
        this.loggedInUser = data;
      },
    });
  }

  handleLogout() {
    this.authService.logout().subscribe({
      error: () => {
        this.toast.error('Oops, something went wrong :(');
      },
      next: () => {
        this.checkLoggedInUser();
        this.router.navigateByUrl('/login');
        this.toast.success('See you later 👋🏼');
      },
    });
  }
}
