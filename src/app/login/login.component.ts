import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: LoginModel;

  constructor(private _auth: AuthService, private _router: Router) {
    this.loginUserData = new LoginModel();
  }

  ngOnInit() {}

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        let userData=res.user
        console.log(userData)
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', userData);
        console.log(res)
        console.log(res.user)
        this._router.navigate(['/special']);
      },
      err => console.log(err)
    );
  }
}
