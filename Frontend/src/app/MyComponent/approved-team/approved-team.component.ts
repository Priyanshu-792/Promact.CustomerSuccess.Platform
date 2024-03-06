import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprovedTeamService } from '../../MyService/approved-team.service';

@Component({
  selector: 'app-approved-team',
  templateUrl: './approved-team.component.html',
  styleUrl: './approved-team.component.css'
})
export class ApprovedTeamComponent {
//for approved team
resourceForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private approvedTeamService: ApprovedTeamService // Inject ApprovedTeamService
  ) { }

  ngOnInit(): void {
    this.resourceForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      phase: [0, Validators.required],
      numberOfResources: [0, Validators.required],
      role: ['', Validators.required],
      availabilityPercentage: [0, Validators.required],
      duration: [0, Validators.required]
    });
  }

  onSubmit() {
    if (this.resourceForm.valid) {
      // Extract form values
      const formData = this.resourceForm.value;

      // Call create method 
      this.approvedTeamService.createApprovedTeam(formData).subscribe(
        (response: any) => {
         
          console.log('Approved team created successfully:', response);
          
          this.resourceForm.reset();
        },
        (error: any) => {
          // Handle error
          console.error('Error creating approved team:', error);
        }
      );
    } else {
   
      console.error('Form is invalid.');
    }
  }
}
