import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from '../../models/new-project';
import { MeetingMinuteService } from '../../MyService/meeting-minute.service';
import { NewProjectService } from '../../MyService/new-project.service';
import { MeetingMinute } from '../../models/meeting-minute';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-meeting-minute',
  templateUrl: './meeting-minute.component.html',
  styleUrl: './meeting-minute.component.css'
})
export class MeetingMinuteComponent implements OnInit {
  @Input() projectId!: string; // Define projectId property
  meetingMinuteForm!: FormGroup;
  projects: NewProject[] = [];
  meetingMinutes: MeetingMinute[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private meetingMinuteService: MeetingMinuteService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    this.meetingMinuteForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      meetingDate: ['', Validators.required],
      duration: ['', Validators.required],
      MoMLink: ['', Validators.required],
      comments: ['']
    });

    this.loadProjects();
    this.loadMeetingMinutes();
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
    if (this.meetingMinuteForm.valid) {
          this.meetingMinuteService.createMeetingMinute(this.meetingMinuteForm.value).subscribe(
            (response: any) => {
              console.log('Meeting minute created successfully:', response);
              this.meetingMinuteForm.reset({ projectId: this.projectId });
              this.loadMeetingMinutes();
            },
            error => {
              console.error('Error creating Meeting minute:', error);
            }
          );
        } else {
        
        }
   }


   loadMeetingMinutes(): void {
  this.meetingMinuteService. getAllMeetingMinutes().subscribe(
    (data: any) => {
      this.meetingMinutes = data.items.filter((MOM: MeetingMinute) => MOM.projectId === this.projectId);
    },
    error => {
      console.error('Error loading project updates:', error);
    }
  );
}

downloadAsPdf() {
  this.meetingMinuteService.getAllMeetingMinutes().subscribe((data: any) => {
    console.log('Received meeting minutes data:', data); // Log received data

    const meetingMinutesData: MeetingMinute[] = data.items.map((minute: any) => ({
      projectId: minute.projectId,
      meetingDate: new Date(minute.meetingDate),
      duration: minute.duration,
      MoMLink: minute.MoMLink,
      comments: minute.comments
    }));

    // Filter meeting minutes based on the project ID
    const filteredMeetingMinutes = meetingMinutesData.filter(minute => minute.projectId === this.projectId);

    if (filteredMeetingMinutes.length === 0) {
      console.log('No meeting minutes found for the specified project ID.');
      return; // Exit function if no meeting minutes are found
    }

    const doc = new jsPDF();
    let yOffset = 10;
    let currentPage = 1;
    const maxPageHeight = doc.internal.pageSize.height - 20; // Maximum height of each page

    filteredMeetingMinutes.forEach(minute => {
      // Check if adding the current minute would exceed the page height
      if (yOffset + 50 > maxPageHeight) {
        doc.addPage(); 
        yOffset = 10; 
        currentPage++;
      }

      doc.text(`Meeting Date: ${minute.meetingDate.toLocaleDateString()}`, 10, yOffset);
      yOffset += 10;

      doc.text(`Duration: ${minute.duration} minutes`, 20, yOffset);
      yOffset += 10;
      doc.text(`MoM Link: ${minute.MoMLink}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Comments: ${minute.comments}`, 20, yOffset);
      yOffset += 10;
      yOffset += 10;
    });
    doc.save(`MeetingMinutes_${currentPage}_Pages.pdf`);
  }, error => {
    console.error('Error fetching meeting minutes:', error);
  });
}

}
