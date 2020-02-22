import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { User } from '../models/user';
import { PolicyService } from '../services/policy.service';
import { UserPolicy } from '../models/policy';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loginUserData: User;
  userPolicies: Array<UserPolicy>;

  constructor(
    private auth: AuthService,
    private policyService: PolicyService
  ) {}

  ngOnInit() {
    this.loginUserData = this.auth.loggedinUser;

    this.policyService.getUserPolicies().subscribe(res => {
      console.log(res);
    });
  }
}
