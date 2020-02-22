import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  private _registerUrl = environment.API_URL + 'policy/register';
  private _loginUrl = environment.API_URL + 'policy';

  constructor(private http: HttpClient, private _router: Router) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/policies']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
 

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
