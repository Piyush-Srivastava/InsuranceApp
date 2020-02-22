import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Policy } from '../models/policy';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  policies = [];

  constructor(
    private _eventService: EventService,
    private auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._eventService.getEvents().subscribe(
      res => {
        this.policies = res;
      },
      err => console.log(err)
    );
  }

  buyPolicy(policy: Policy) {
    if (this.auth.loggedIn()) {
      this._router.navigate(['/payment'], {
        queryParams: {
          id: policy._id
        }
      });
    } else {
      this._router.navigate(['/login'], {
        queryParams: {
          returnUrl: `payment?id=${policy._id}`
        }
      });
    }
  }
}