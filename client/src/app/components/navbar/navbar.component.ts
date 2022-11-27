import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  isUserLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe({
      error: () => {
        this.isUserLoggedIn = false;
      },
      next: () => {
        this.isUserLoggedIn = true;
      },
    });
  }
}
