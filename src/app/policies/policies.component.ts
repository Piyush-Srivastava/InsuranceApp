import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  policies = [];

  constructor(private _eventService: EventService) {}

  ngOnInit() {
    this._eventService.getEvents().subscribe(
      res => {
        this.policies = res;
      },
      err => console.log(err)
    );
  }
}
