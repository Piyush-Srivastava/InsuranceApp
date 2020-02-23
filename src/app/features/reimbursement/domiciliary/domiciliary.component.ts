import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { ClaimPostData } from '../../../models/domicileClaim.model';
import { ToastyConfig } from 'ng2-toasty';
import { ToastyService } from 'ng2-toasty';
import { PolicyService } from '../../../services/policy.service';
import { User } from '../../../models/user';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-domiciliary',
  templateUrl: './domiciliary.component.html',
  styleUrls: ['./domiciliary.component.css']
})
export class DomiciliaryComponent implements OnInit {
  loginUserData: User;
  public successMessage: string;
  public claimPostData: ClaimPostData[]
  public newClaimGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,private toastyConfig: ToastyConfig,private toastyService: ToastyService,
    public policyService:PolicyService,private auth: AuthService ) {
      this.toastyConfig.theme = 'bootstrap';
		this.successMessage = null;
    }

  ngOnInit() {
    this.loginUserData = this.auth.loggedinUser;
    this.newForm();
  }

  public onSubmit() {
    let claimPostData = new ClaimPostData();
    claimPostData.email=this.newClaimGroup.get('email').value;
    claimPostData.code=this.newClaimGroup.get('code').value;
    claimPostData.nature=this.newClaimGroup.get('nature').value;
    claimPostData.clinicPinCode=this.newClaimGroup.get('clinicPinCode').value;
    claimPostData.description=this.newClaimGroup.get('description').value;
    claimPostData.startDate=this.newClaimGroup.get('startDate').value;
    claimPostData.endDate=this.newClaimGroup.get('endDate').value;
    claimPostData.regNo=this.newClaimGroup.get('regNo').value;
    claimPostData.doctorName=this.newClaimGroup.get('doctorName').value;
    claimPostData.clinicName=this.newClaimGroup.get('clinicName').value;
    claimPostData.claimAmount=this.newClaimGroup.get('claimAmount').value;

    this.policyService.addDomClaimdata((claimPostData) as ClaimPostData)
    
			.subscribe(() => {
				this.toastyService.success({
					title: 'Claimed',
					msg: 'Succesfully claimed',
					showClose: true,
				});
			},
				err => {
					this.toastyService.error({
						title: 'Error',
						msg: err.msg,
						showClose: true
					});
				}
			);

  }

  private newForm() {
    this.newClaimGroup = this.formBuilder.group({
      
      email: [null],
      code: [null],
      claimAmount: [null],
      nature: [null],
      description: [null],
      startDate: [null],
      endDate: [null],
      clinicName: [null],
      clinicPinCode: [null],
      regNo: [null],
      doctorName: [null]
    });
  }
}
