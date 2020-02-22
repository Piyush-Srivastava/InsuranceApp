import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loginUserData: any;

  constructor(
    ) { 
     
    }

  ngOnInit() {
    this.loginUserData=localStorage.getItem('user')
    console.log(this.loginUserData)
  }
  
  
}
