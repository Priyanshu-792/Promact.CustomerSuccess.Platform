import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from '../../models/new-project';
import { EscalationMatrix } from '../../models/EscalationMatrix';
import { EscalationMatrixService } from '../../MyService/escalation-matrix.service';
import { NewProjectService } from '../../MyService/new-project.service';

@Component({
  selector: 'app-escalation-matrix',
  templateUrl: './escalation-matrix.component.html',
  styleUrl: './escalation-matrix.component.css'
})
export class EscalationMatrixComponent implements OnInit {
  @Input() projectId!: string;
  escalationForm!: FormGroup;
  projects: NewProject[] = [];
  escalationMatrixEntries: EscalationMatrix[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private escalationMatrixService: EscalationMatrixService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    // Initialize the escalation matrix form
    this.escalationForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      name: ['', Validators.required],
      level: ['', Validators.required],
      escalationType: ['', Validators.required]
    });

    // Load projects for dropdown
    this.loadProjects();
    this.loadEscalationMatrixEntries();
  }

  pName!: string; // This is to symbolize Project Name

  loadProjects(): void {
    this.newProjectService.getAllProjects('project').subscribe(
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
    if (this.escalationForm.valid) {
      // Call the service to create a new escalation matrix entry
      this.escalationMatrixService.createEscalationMatrix(this.escalationForm.value).subscribe(
        (response: any) => {
          // Handle success response if needed
          console.log('Escalation matrix entry created successfully:', response);
          // Reset the form after successful submission
          this.escalationForm.reset({ projectId: this.projectId });
          this.loadEscalationMatrixEntries();
        },
        error => {
          // Handle error if needed
          console.error('Error creating escalation matrix entry:', error);
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }

  loadEscalationMatrixEntries(): void {
    this.escalationMatrixService.getAllEscalationMatrixEntries().subscribe(
      (data: any) => {
        this.escalationMatrixEntries = data.items.filter((entry: EscalationMatrix) => entry.projectId === this.projectId);
        // Assuming data.items contains escalation matrix entries
      },
      error => {
        console.error('Error loading escalation matrix entries:', error);
      }
    );
  }

  downloadAsPdf() {
    // Implementation for PDF download, similar to client feedback component
  }
}
