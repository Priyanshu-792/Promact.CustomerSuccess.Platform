import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from '../../models/new-project';
import { MeetingMinuteService } from '../../MyService/meeting-minute.service';
import { NewProjectService } from '../../MyService/new-project.service';

@Component({
  selector: 'app-meeting-minute',
  templateUrl: './meeting-minute.component.html',
  styleUrl: './meeting-minute.component.css'
})
export class MeetingMinuteComponent implements OnInit {
  @Input() projectId!: string; // Define projectId property
  meetingMinuteForm!: FormGroup;
  projects: NewProject[] = [];

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
      momLink: [''],
      comments: ['']
    });

    this.loadProjects();
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
          // Call the service to create a new Meeting minute
          this.meetingMinuteService.createMeetingMinute(this.meetingMinuteForm.value).subscribe(
            (response: any) => {
              // Handle success response if needed
              console.log('Meeting minute created successfully:', response);
              // Reset the form after successful submission
              this.meetingMinuteForm.reset({ projectId: this.projectId });
            },
            error => {
              // Handle error if needed
              console.error('Error creating Meeting minute:', error);
            }
          );
        } else {
          // Form is invalid, handle accordingly
        }
   }
}
