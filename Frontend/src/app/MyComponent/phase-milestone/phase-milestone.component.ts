import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhaseMilestone } from '../../models/phase-milestone';
import { PhaseMilestoneService } from '../../MyService/phase-milestone.service';
import { NewProject } from '../../models/new-project';
import { NewProjectService } from '../../MyService/new-project.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-phase-milestone',
  templateUrl: './phase-milestone.component.html',
  styleUrl: './phase-milestone.component.css'
})
export class PhaseMilestoneComponent implements OnInit {
  @Input() projectId!: string;
  phaseMilestoneForm!: FormGroup;
  projects: NewProject[] = [];
  phaseMilestones: PhaseMilestone[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private phaseMilestoneService: PhaseMilestoneService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    this.phaseMilestoneForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      approvalDate: ['', Validators.required],
      status: ['', Validators.required],
      revisedCompletionDate: ['', Validators.required],
      comments: ['', Validators.required]
    });
this.loadProjects();
    this.loadPhaseMilestones();
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




  loadPhaseMilestones(): void {
    this.phaseMilestoneService.getAllPhaseMilestones().subscribe(
      (data: any) => {
        this.phaseMilestones = data.items.filter((milestone: PhaseMilestone) => milestone.projectId === this.projectId);
      },
      error => {
        console.error('Error loading phase milestones:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.phaseMilestoneForm.valid) {
      this.phaseMilestoneService.createPhaseMilestone(this.phaseMilestoneForm.value).subscribe(
        (response: any) => {
          console.log('Phase milestone created successfully:', response);
          this.phaseMilestoneForm.reset({ projectId: this.projectId });
          this.loadPhaseMilestones();
        },
        error => {
          console.error('Error creating phase milestone:', error);
        }
      );
    } else {
      // Handle invalid form
    }
  }

  downloadAsPdf(): void {
    this.phaseMilestoneService.getAllPhaseMilestones().subscribe(
      (data: any) => {
        const phaseMilestoneData: PhaseMilestone[] = data.items.map((milestone: any) => ({
          projectId: milestone.projectId,
          title: milestone.title,
          startDate: new Date(milestone.startDate),
          endDate: new Date(milestone.endDate),
          approvalDate: new Date(milestone.approvalDate),
          status: milestone.status,
          revisedCompletionDate: new Date(milestone.revisedCompletionDate),
          comments: milestone.comments
        }));

        const filteredMilestones = phaseMilestoneData.filter(milestone => milestone.projectId === this.projectId);

        if (filteredMilestones.length === 0) {
          console.log('No phase milestones found for the specified project ID.');
          return;
        }

        const doc = new jsPDF();
        let yOffset = 10;
        let currentPage = 1;
        const maxPageHeight = doc.internal.pageSize.height - 20;

        filteredMilestones.forEach(milestone => {
          if (yOffset + 50 > maxPageHeight) {
            doc.addPage();
            yOffset = 10;
            currentPage++;
          }

          doc.text(`Title: ${milestone.title}`, 20, yOffset);
          yOffset += 10;
          doc.text(`Start Date: ${milestone.startDate.toLocaleDateString()}`, 20, yOffset);
          yOffset += 10;
          doc.text(`End Date: ${milestone.endDate.toLocaleDateString()}`, 20, yOffset);
          yOffset += 10;
          doc.text(`Approval Date: ${milestone.approvalDate.toLocaleDateString()}`, 20, yOffset);
          yOffset += 10;
          doc.text(`Status: ${milestone.status}`, 20, yOffset);
          yOffset += 10;
          doc.text(`Revised Completion Date: ${milestone.revisedCompletionDate.toLocaleDateString()}`, 20, yOffset);
          yOffset += 10;
          doc.text(`Comments: ${milestone.comments}`, 20, yOffset);
          yOffset += 10;
          yOffset += 10;
        });

        doc.save(`Phase_Milestones_${currentPage}Pages.pdf`);
      },
      error => {
        console.error('Error fetching phase milestones:', error);
      }
    );
  }
}
