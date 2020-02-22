import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Policy } from '../models/policy';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';

@Injectable()
export class PolicyService {
  private _eventsUrl = environment.API_URL + 'policy/policyDetailsWithoutJWT';
  private _specialEventsUrl = environment.API_URL + 'policy/policyDetails';
  private _add_policy = environment.API_URL + 'policy/add';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getPolicyWithoutJWT() {
    return this.http.get<any>(this._eventsUrl);
  }

  getPolicies() {
    return this.http.get<Array<Policy>>(this._specialEventsUrl);
  }

  buyPolicy(policy: Policy) {
    const body = {
      email: this.auth.loggedinUser.email,
      code: policy.code,
      name: policy.policyName,
      description: policy.description,
      date: policy.date,
      duration: policy.duration,
      amount: policy.amount
    };

    return this.http.post(this._add_policy, body);
  }
}
