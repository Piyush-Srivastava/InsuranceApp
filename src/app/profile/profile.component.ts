import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loginUserData: User;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.loginUserData = this.auth.loggedinUser;
  }
}
