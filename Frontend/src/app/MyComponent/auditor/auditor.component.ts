import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// In your parent component's module (e.g., parent.module.ts)

@Component({
  selector: 'app-auditor',
  templateUrl: './auditor.component.html',
  styleUrl: './auditor.component.css'
})
export class AuditorComponent implements OnInit{
//for approved team
onSubmit() {
  throw new Error('Method not implemented.');
  }
    resourceForm !: FormGroup;
    feedbackForm !: FormGroup;
    constructor(private formBuilder: FormBuilder) { }
  
    ngOnInit(): void {
      this.resourceForm = this.formBuilder.group({
        projectId: ['', Validators.required],
        phase: [0, Validators.required],
        numberOfResources: [0, Validators.required],
        role: ['', Validators.required],
        availabilityPercentage: [0, Validators.required],
        duration: [0, Validators.required]
      });

// clientfeedback
this.feedbackForm = this.formBuilder.group({
  projectId: ['', Validators.required],
  feedbackType: ['', Validators.required],
  dateReceived: ['', Validators.required],
  detailedFeedback: ['', Validators.required],
  actionTaken: ['', Validators.required],
  closureDate: ['', Validators.required]
});
    }




  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

 



}
