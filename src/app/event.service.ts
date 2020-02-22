import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Policy } from './models/policy';
import { environment } from '../environments/environment';

@Injectable()
export class EventService {

  private _eventsUrl = "http://localhost:3000/api/events";
  private _specialEventsUrl = environment.API_URL + "policy/policyDetails";
  private _add_policy = environment.API_URL + 'policy/add';

  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._eventsUrl)
  }

  getPolicies() {
    return this.http.get<Array<Policy>>(this._specialEventsUrl)
  }

  buyPolicy(policy: Policy) {
    let user = localStorage.getItem('user');
    const body = {
      email: JSON.parse(user).email,
      code: policy.code 
    };

    return this.http.post(this._add_policy, body);
  }
}
