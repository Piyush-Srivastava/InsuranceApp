import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-domiciliary',
  templateUrl: './domiciliary.component.html',
  styleUrls: ['./domiciliary.component.css']
})
export class DomiciliaryComponent implements OnInit {
  public newClaimFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  public onSubmit() {}

  private newForm() {
		this.newClaimFormGroup = this.formBuilder.group({
      patientName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      mobile: [null, [Validators.required]],
      patientAge: [null],
      relationship: [null],
      domiBalance: [null],
      nature: [null, [Validators.required]],
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      clinicName: [null, [Validators.required]],
      clinicPinCode: [null, [Validators.required]],
      doctorNo: [null, [Validators.required]],
      doctorName: [null, [Validators.required]],
			
    });
  }

}
