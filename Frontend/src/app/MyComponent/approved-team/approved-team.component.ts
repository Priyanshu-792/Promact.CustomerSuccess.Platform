import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprovedTeamService } from '../../MyService/approved-team.service';
import { NewProjectService } from '../../MyService/new-project.service';

@Component({
  selector: 'app-approved-team',
  templateUrl: './approved-team.component.html',
  styleUrl: './approved-team.component.css'
})
export class ApprovedTeamComponent implements OnInit{

//This Trial for dropdown is successful and can be used as the final code
resourceForm!: FormGroup;
  projects: any[] = []; // Define projects array

  constructor(
    private formBuilder: FormBuilder,
    private approvedTeamService: ApprovedTeamService,
    private newProjectService: NewProjectService // Inject NewProjectService
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

    this.loadProjects(); // Call loadProjects() method on component initialization
  }

  loadProjects(): void {
    this.newProjectService.getAllProjects('project').subscribe(
      (data: any) => {
        this.projects = data.items.map((project: any) => ({
          id: project.id,
          projectName: project.name
        }));
      },
      error => {
        console.error('Error loading projects:', error);
      }
    );
  }

  onSubmit() {
    if (this.resourceForm.valid) {
      const formData = this.resourceForm.value;

      this.approvedTeamService.createApprovedTeam(formData).subscribe(
        (response: any) => {
          console.log('Approved team created successfully:', response);
          this.resourceForm.reset();
        },
        (error: any) => {
          console.error('Error creating approved team:', error);
        }
      );
    } else {
      console.error('Form is invalid.');
    }
  }

}
