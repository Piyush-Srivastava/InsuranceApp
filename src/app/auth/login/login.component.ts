import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData: LoginModel;

  returnURL: string;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    this.loginUserData = new LoginModel();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.returnURL = params['returnUrl'];
    });
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this._auth.loggedinUser = res.user;
        if (this.returnURL) {
          this._router.navigateByUrl(this.returnURL);
        } else {
          this._router.navigate(['/special']);
        }
      },
      err => console.log(err)
    );
  }
}
