import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { Policy } from '../../models/policy';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents: Array<Policy> = []

  constructor(private _eventService: EventService,
    private _router: Router) { }


  ngOnInit() {
    this._eventService.getPolicies()
      .subscribe(
        res => {
          this.specialEvents = res;
          console.log(this.specialEvents);
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._router.navigate(['/login'])
            }
          }
        }
      )
  }

  buyPolicy(policy: Policy) {
    console.log(Policy)
    this._router.navigate(['/payment'], {
      queryParams: {
        id: policy._id
      }
    });
  }

}
