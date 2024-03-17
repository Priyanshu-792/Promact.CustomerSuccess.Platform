import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectDescription } from '../../models/project-description';
import { ProjectDescriptionService } from '../../MyService/project-description.service';
import jsPDF from 'jspdf';
import { NewProjectService } from '../../MyService/new-project.service';
import { NewProject } from '../../models/new-project';

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  styleUrl: './project-description.component.css'
})
export class ProjectDescriptionComponent {
  @Input() projectId!: string;
  projectDescriptionForm!: FormGroup;
  projects: NewProject[] = [];
  projectDescriptions: ProjectDescription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private projectDescriptionService: ProjectDescriptionService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    this.projectDescriptionForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      description: ['', Validators.required]
    });
    this.loadProjects();
    this.loadProjectDescriptions();
  }


  pName!: string;// This is to symbolize Project Name
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
    if (this.projectDescriptionForm.valid) {
      this.projectDescriptionService.createProjectDescription(this.projectDescriptionForm.value).subscribe(
        (response: any) => {
          console.log('Project description created successfully:', response);
          this.projectDescriptionForm.reset();
          this.loadProjectDescriptions();
        },
        error => {
          console.error('Error creating project description:', error);
        }
      );
    }
  }

  loadProjectDescriptions(): void {
    this.projectDescriptionService.getAllProjectDescriptions().subscribe(
      (data: any) => {
        this.projectDescriptions = data.items.filter((description: ProjectDescription) => description.projectId === this.projectId);
      },
      error => {
        console.error('Error loading client feedbacks:', error);
      }
    );
  }



  downloadAsPdf() {
    const doc = new jsPDF();
    let yOffset = 10;
    let currentPage = 1;
    const maxPageHeight = doc.internal.pageSize.height - 20;
  
    this.projectDescriptions.forEach((description, index) => {
      doc.text(`Project Name: ${this.pName}`, 10, yOffset);
      doc.text(`Description: ${description.description}`, 10, yOffset + 10);
      yOffset += 20; // Increment yOffset
  
      // Check if the current entry exceeds the current page height
      if (yOffset + 20 > maxPageHeight) {
        doc.addPage(); // Add a new page
        yOffset = 10; 
        currentPage++; 
      }

    });
    doc.save(`Latest_Project_Description_of_${this.pName}.pdf`);
  }
  
}
