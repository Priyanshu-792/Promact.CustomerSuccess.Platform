import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sprint } from '../../models/sprint';
import { NewProject } from '../../models/new-project';
import { SprintService } from '../../MyService/sprint.service';
import jsPDF from 'jspdf';
import { NewProjectService } from '../../MyService/new-project.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrl: './sprint.component.css'
})
export class SprintComponent {
  @Input() projectId!: string;
  sprintForm!: FormGroup;
  projects: NewProject[] = [];
  sprints: Sprint[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private sprintService: SprintService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    this.sprintForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      sprintNumber: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      comments: [''],
      goals: ['']
    });

    this.loadProjects();
    this.loadSprints();
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
    if (this.sprintForm.valid) {
      this.sprintService.createSprint(this.sprintForm.value).subscribe(
        (response: any) => {
          console.log('Sprint created successfully:', response);
          this.sprintForm.reset({ projectId: this.projectId });
          this.loadSprints();
        },
        error => {
          console.error('Error creating sprint:', error);
        }
      );
    } else {
    }
  }

  loadSprints(): void {
    this.sprintService.getAllSprints().subscribe(
      (data: any) => {
        this.sprints = data.items.filter((sprint: Sprint) => sprint.projectId === this.projectId);
      },
      error => {
        console.error('Error loading sprints:', error);
      }
    );
  }

  downloadAsPdf() {
    const doc = new jsPDF();

    let yOffset = 10;
    let currentPage = 1;
    const maxPageHeight = doc.internal.pageSize.height - 20; 
    this.sprints.forEach(sprint => {
      if (yOffset + 50 > maxPageHeight) {
        doc.addPage(); 
        yOffset = 10; // Reset yOffset for the new page
        currentPage++;
      }

      // Add sprint details
      doc.text(`Sprint Number: ${sprint.sprintNumber}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Start Date: ${sprint.startDate}`, 20, yOffset);
      yOffset += 10;
      doc.text(`End Date: ${sprint.endDate}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Status: ${sprint.status}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Comments: ${sprint.comments}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Goals: ${sprint.goals}`, 20, yOffset);
      yOffset += 10;

      yOffset += 10;
    });

  
    doc.save(`Sprint_Details_of_Project_${this.projectId}_Page_${currentPage}.pdf`);
  }
}
