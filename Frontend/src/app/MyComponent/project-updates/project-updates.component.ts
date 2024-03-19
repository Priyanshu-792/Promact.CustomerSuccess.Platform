import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from '../../models/new-project';
import { NewProjectService } from '../../MyService/new-project.service';
import { ProjectUpdatesService } from '../../MyService/project-updates.service';
import { ProjectUpdates } from '../../models/project-updates';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-project-updates',
  templateUrl: './project-updates.component.html',
  styleUrl: './project-updates.component.css'
})
export class ProjectUpdatesComponent implements OnInit {
  @Input() projectId!: string; // Define projectId property
  updateForm!: FormGroup;
  projects: NewProject[] = [];
  projectUpdates: ProjectUpdates[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private projectUpdatesService: ProjectUpdatesService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      date: ['', Validators.required],
      generalUpdates: ['', Validators.required]
    });
       // Load projects for dropdown
   this.loadProjects();
   this. loadProjectUpdates();
  }

  pName!:string;
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
  if (this.updateForm.valid) {
        // Call the service to create Project updates
        this.projectUpdatesService.createProjectUpdate(this.updateForm.value).subscribe(
          (response: any) => {
            console.log('Project Updates created successfully:', response);
            // Reset the form after successful submission
            this.updateForm.reset({ projectId: this.projectId });
            this. loadProjectUpdates();
          },
          error => {
            
            console.error('Error creating Project updates:', error);
          }
        );
      } else {
        // Form is invalid
      }
 }


 loadProjectUpdates(): void {
  this.projectUpdatesService.getAllProjectUpdates().subscribe(
    (data: any) => {
      this.projectUpdates = data.items.filter((update: ProjectUpdates) => update.projectId === this.projectId);
    },
    error => {
      console.error('Error loading project updates:', error);
    }
  );
}


downloadAsPdf() {
  this.projectUpdatesService.getAllProjectUpdates().subscribe((data: any) => {
    console.log('Received project updates data:', data); // Log received data

    const projectUpdatesData: ProjectUpdates[] = data.items.map((update: any) => ({
      projectId: update.projectId,
      date: new Date(update.date),
      generalUpdates: update.generalUpdates
    }));

    // Filter project updates based on the project ID
    const filteredProjectUpdates = projectUpdatesData.filter(update => update.projectId === this.projectId);

    if (filteredProjectUpdates.length === 0) {
      console.log('No project updates found for the specified project ID.');
      return; 
    }

    const doc = new jsPDF();
    let yOffset = 10;
    let currentPage = 1;
    const maxPageHeight = doc.internal.pageSize.height - 20; // Maximum height of each page

    filteredProjectUpdates.forEach(update => {
      // Check if adding the current update would exceed the page height
      if (yOffset + 50 > maxPageHeight) {
        doc.addPage(); // Add a new page
        yOffset = 10; // Reset yOffset for the new page
        currentPage++;
      }

      // Add date as heading
      doc.text(`Date: ${update.date.toLocaleDateString()}`, 10, yOffset);
      yOffset += 10;

      // Add general updates below date
      doc.text(`General Updates: ${update.generalUpdates}`, 20, yOffset);
      yOffset += 10;

      // Add spacing between updates
      yOffset += 10;
    });

    // Save the PDF with appropriate file name
    doc.save(`ProjectUpdates_${currentPage}_Pages.pdf`);
  }, error => {
    console.error('Error fetching project updates:', error);
  });
}



}
