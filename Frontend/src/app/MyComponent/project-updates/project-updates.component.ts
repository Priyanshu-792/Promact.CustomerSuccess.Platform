import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from '../../models/new-project';
import { NewProjectService } from '../../MyService/new-project.service';
import { ProjectUpdatesService } from '../../MyService/project-updates.service';
import { ProjectUpdates } from '../../models/project-updates';

@Component({
  selector: 'app-project-updates',
  templateUrl: './project-updates.component.html',
  styleUrl: './project-updates.component.css'
})
export class ProjectUpdatesComponent implements OnInit {
  updateForm!: FormGroup;
  projects: NewProject[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private projectUpdatesService: ProjectUpdatesService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      date: ['', Validators.required],
      generalUpdates: ['', Validators.required]
    });
       // Load projects for dropdown
   this.loadProjects();
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
  if (this.updateForm.valid) {
        // Call the service to create Project updates
        this.projectUpdatesService.createProjectUpdate(this.updateForm.value).subscribe(
          (response: any) => {
            // Handle success response if needed
            console.log('Client feedback created successfully:', response);
            // Reset the form after successful submission
            this.updateForm.reset();
          },
          error => {
            // Handle error if needed
            console.error('Error creating Project updates:', error);
          }
        );
      } else {
        // Form is invalid, handle accordingly
      }
 }

}
