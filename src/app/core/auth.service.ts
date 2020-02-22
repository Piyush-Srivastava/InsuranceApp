import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { LoginResponse, LoginModel } from '../models/login.model';

@Injectable()
export class AuthService {
  private _registerUrl = environment.API_URL + 'policy/register';
  private _loginUrl = environment.API_URL + 'policy';
  private _profileDetails = environment.API_URL + 'policy/userDetails';

  loggedinUser: User;

  constructor(private http: HttpClient, private _router: Router) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: LoginModel) {
    return this.http.post<LoginResponse>(this._loginUrl, user);
  }

  getUserDetails() {
    return this.http.get<User>(this._profileDetails);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/policies']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token') && this.loggedinUser;
  }
}
