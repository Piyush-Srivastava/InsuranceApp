import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Policy, UserPolicy } from '../models/policy';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';
import { ClaimPostData, ClaimedData } from '../models/domicileClaim.model';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PolicyService {
  private _eventsUrl = environment.API_URL + 'policy/policyDetailsWithoutJWT';
  private _specialEventsUrl = environment.API_URL + 'policy/policyDetails';
  private _add_policy = environment.API_URL + 'policy/add';
  private _user_policyies = environment.API_URL + 'policy/userPolicies';
  private _add_policies= environment.API_URL  +'policy/add';
  private _dom_post_form=environment.API_URL +'policy/claim';
  private _user_claims=environment.API_URL+'policy/userClaims'

  constructor(private http: HttpClient, private auth: AuthService) {}

  getPolicyWithoutJWT() {
    return this.http.get<any>(this._eventsUrl);
  }

  getPolicies() {
    return this.http.get<Array<Policy>>(this._specialEventsUrl);
  }

  getUserPolicies() {
    let url = this._user_policyies + '?email=' + this.auth.loggedinUser.email;
    return this.http.get<Array<UserPolicy>>(url);
  }

  getUserClaims(){
    let url=this._user_claims+'?email='+this.auth.loggedinUser.email;
    return this.http.get<Array<ClaimedData>>(url)

  }


  addPolicy(policy) {
    let url=this._add_policies+'?email='+this.auth.loggedinUser.email;
    return this.http.post<any>(url, policy);
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

  addDomClaimdata(addedClaimData:ClaimPostData):Observable<any>{
    return this.http.post(this._dom_post_form, addedClaimData);
  }
}
