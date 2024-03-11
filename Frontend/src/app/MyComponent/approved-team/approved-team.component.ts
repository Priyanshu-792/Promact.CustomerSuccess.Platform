import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApprovedTeamService } from '../../MyService/approved-team.service';
import { NewProjectService } from '../../MyService/new-project.service';
import jsPDF from 'jspdf';
import { ApprovedTeam } from '../../models/approved-team';
import { map } from 'rxjs';

@Component({
  selector: 'app-approved-team',
  templateUrl: './approved-team.component.html',
  styleUrl: './approved-team.component.css'
})
export class ApprovedTeamComponent implements OnInit{

//trying the auto fill id
@Input() projectId!: string; // Define projectId property
approvedTeams: ApprovedTeam[] = [];
  resourceForm!: FormGroup;
  projectPlaceholder!: string;
  projects: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private approvedTeamService: ApprovedTeamService,
    private projectService: NewProjectService
  ) { }

  ngOnInit(): void {
    this.resourceForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required], // Use projectId in the value
      phase: [0, Validators.required],
      numberOfResources: [0, Validators.required],
      role: ['', Validators.required],
      availabilityPercentage: [0, Validators.required],
      duration: [0, Validators.required]
    });

    this.loadProjects();
    
  }
pName!:string;
  loadProjects(): void {
    this.projectService.getAllProjects('project').subscribe(
      (data: any) => {
        this.projects = data.items.map((project: any) => ({
          id: project.id,
          projectName: project.name
        }));

        this.projects.forEach((project: any) => {
          if (project.id === this.projectId) {
            this.pName = project.projectName;
          }
        });

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
          this.resourceForm.reset({ projectId: this.projectId });
        },
        (error: any) => {
          console.error('Error creating approved team:', error);
        }
      );
    } else {
      console.error('Form is invalid.');
    }
}

// trying to implement download as pdf
downloadAsPdf() {
  this.approvedTeamService.getAllApprovedTeams().subscribe((data: any) => {
    this.approvedTeams = data.items.map((team: any) => ({
      projectId: team.projectId,
      phase: team.phase,
      numberOfResources: team.numberOfResources,
      role: team.role,
      availabilityPercentage: team.availabilityPercentage,
      duration: team.duration
    }));

    // Filter approved teams based on the project ID
    const filteredTeams = this.approvedTeams.filter(team => team.projectId === this.projectId);

    // Sort teams by phase number in ascending order
    filteredTeams.sort((a, b) => a.phase - b.phase);

    // Generate PDF
    const doc = new jsPDF();
    let yOffset = 10;

    filteredTeams.forEach(team => {
      // Add phase number as heading
      doc.text(`Phase ${team.phase}`, 10, yOffset);
      yOffset += 10;

      // Add other data fields below phase heading
      doc.text(`Number of Resources: ${team.numberOfResources}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Role: ${team.role}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Availability Percentage: ${team.availabilityPercentage}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Duration: ${team.duration}`, 20, yOffset);
      yOffset += 10;

      // Add spacing between phases
      yOffset += 10;
    });

    doc.save('approved_team.pdf');
  }, error => {
    console.error('Error fetching approved teams:', error);
  });
}
}

