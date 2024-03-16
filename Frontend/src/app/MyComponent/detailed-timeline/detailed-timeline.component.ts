import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from '../../models/new-project';
import { DetailedTimeline } from '../../models/detailed-timeline';
import { DetailedTimelineService } from '../../MyService/detailed-timeline.service';
import { NewProjectService } from '../../MyService/new-project.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-detailed-timeline',
  templateUrl: './detailed-timeline.component.html',
  styleUrl: './detailed-timeline.component.css'
})
export class DetailedTimelineComponent {
  @Input() projectId!: string;
  timelineForm!: FormGroup;
  projects: NewProject[] = [];
  timelines: DetailedTimeline[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private timelineService: DetailedTimelineService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    this.timelineForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      link: ['', Validators.required]
    });

    this.loadProjects();
    this.loadTimelines();
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
    if (this.timelineForm.valid) {
      this.timelineService.createTimeline(this.timelineForm.value).subscribe(
        (response: any) => {
          console.log('Timeline created successfully:', response);
          this.timelineForm.reset({ projectId: this.projectId });
          this.loadTimelines();
        },
        error => {
          console.error('Error creating timeline:', error);
        }
      );
    } else {
     
    }
  }

  loadTimelines(): void {
    this.timelineService.getAllTimelines().subscribe(
      (data: any) => {
        this.timelines = data.items.filter((timeline: DetailedTimeline) => timeline.projectId === this.projectId);
      },
      error => {
        console.error('Error loading timelines:', error);
      }
    );
  }

  downloadAsPdf() {
    // Create a new PDF instance
    const doc = new jsPDF();
  
    let yOffset = 10;
    let currentPage = 1;
  
    this.timelines.forEach(timeline => {
     
      if (yOffset + 50 > doc.internal.pageSize.height) {
        doc.addPage(); 
        yOffset = 10; 
        currentPage++; 
      }

      doc.text(`Project ID: ${timeline.projectId}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Link: ${timeline.link}`, 20, yOffset);
      yOffset += 10;

      yOffset += 10;
    });

    // Save the PDF with appropriate file name
    doc.save(`Detailed_timeline_of_${currentPage}Pages.pdf`);
  }
}
