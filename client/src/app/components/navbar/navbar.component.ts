import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  isUserLoggedIn: { isLoading: boolean; status: boolean } = {
    isLoading: true,
    status: false,
  };

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe({
      error: () => {
        this.isUserLoggedIn = { isLoading: false, status: false };
      },
      next: () => {
        this.isUserLoggedIn = { isLoading: false, status: true };
      },
    });
  }
}
