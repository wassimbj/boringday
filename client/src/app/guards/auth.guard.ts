import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: HotToastService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, _) => {
      this.authService.getLoggedInUser().subscribe({
        error: () => {
          if (state.url !== '/login' && state.url !== '/join') {
            this.toast.info('Please login first');
            this.router.navigateByUrl('/login');
            resolve(false);
          } else {
            resolve(true);
          }
        },
        next: () => {
          if (state.url === '/login' || state.url === '/join') {
            this.toast.info('You are already logged in 😁');
            this.router.navigateByUrl('/');
            resolve(false);
          } else {
            resolve(true);
          }
        },
      });
    });
  }
}
