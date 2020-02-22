import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate() {
    if (this._authService.loggedIn()) {
      return true;
    } else {
      return this.getUserInfo();
    }
  }

  getUserInfo() {
    let token = this._authService.getToken();

    if (token) {
      return this._authService.getUserDetails().pipe(
        map(res => {
          if (res) {
            this._authService.loggedinUser = res;
            return true;
          } else {
            this._router.navigate(['/login']);
            return false;
          }
        })
      );
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
