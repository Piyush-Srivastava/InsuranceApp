import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../services/policy.service';
import { ClaimedData } from '../../models/domicileClaim.model';

@Component({
  selector: 'app-claim-tracker',
  templateUrl: './claim-tracker.component.html',
  styleUrls: ['./claim-tracker.component.css']
})
export class ClaimTrackerComponent implements OnInit {
  public claimedData:ClaimedData[];

  constructor(public policyService:PolicyService) { }

  ngOnInit() {

    this.policyService.getUserClaims().subscribe(res => {
      this.claimedData=res;
      
      console.log(res);
      
    });
  }

}
