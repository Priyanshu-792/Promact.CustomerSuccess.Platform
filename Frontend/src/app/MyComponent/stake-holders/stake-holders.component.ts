import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stakeholder } from '../../models/stake-holders';
import { StakeHoldersService } from '../../MyService/stake-holders.service';
import jsPDF from 'jspdf';
import { NewProjectService } from '../../MyService/new-project.service';
import { NewProject } from '../../models/new-project';

@Component({
  selector: 'app-stake-holders',
  templateUrl: './stake-holders.component.html',
  styleUrl: './stake-holders.component.css'
})
export class StakeHoldersComponent implements OnInit{
  @Input() projectId!: string;
  feedbackForm!: FormGroup;
  projects: NewProject[] = [];
  stakeholders: Stakeholder[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private stakeholderService: StakeHoldersService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      title: ['', Validators.required],
      name: ['', Validators.required],
      contact: ['', Validators.required]
    });
this.loadProjects();
    this.loadStakeholders();

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
    if (this.feedbackForm.valid) {
         
          this.stakeholderService.createStakeholder(this.feedbackForm.value).subscribe(
            (response: any) => {
             
              console.log('Client feedback created successfully:', response);
             
              this.feedbackForm.reset({ projectId: this.projectId});
              this.loadStakeholders();
            },
            error => {
              
              console.error('Error creating client feedback:', error);
            }
          );
        } else {
         
        }
   }

  loadStakeholders(): void {
    this.stakeholderService.getAllStakeholders().subscribe(
      (data: any) => {
        this.stakeholders = data.items.filter((stakeholder: Stakeholder) => stakeholder.projectId === this.projectId);
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

    this.stakeholders.forEach(stakeholder => {
      if (yOffset + 50 > maxPageHeight) {
        doc.addPage();
        yOffset = 10;
        currentPage++;
      }

      doc.text(`Project ID: ${stakeholder.projectId}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Title: ${stakeholder.title}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Name: ${stakeholder.name}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Contact: ${stakeholder.contact}`, 20, yOffset);
      yOffset += 10;

      yOffset += 10;
    });

    doc.save(`Stakeholders_of_${currentPage}Pages.pdf`);
  }
}
