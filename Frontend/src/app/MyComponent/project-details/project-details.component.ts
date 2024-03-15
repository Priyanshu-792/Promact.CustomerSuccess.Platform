import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApprovedTeam } from '../../models/approved-team';
import { ClientFeedback } from '../../models/client-feedback';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit {
  projectId!: string;
  approvedTeams: ApprovedTeam[] = [];
  clientFeedback: ClientFeedback[] = [];
  
  constructor(
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });
  }
}


























































































//   downloadAsPdf() {
//     const approvedTeams$ = this.approvedTeamService.getAllApprovedTeams();
//     const clientFeedback$ = this.clientFeedbackService.getAllClientFeedbacks();
//     const resources$ = this.resourceService.getAllResources();
//     const projectUpdates$ = this.projectUpdatesService.getAllProjectUpdates();
//     const meetingMinutes$ = this.meetingMinuteService.getAllMeetingMinutes();

//     forkJoin([approvedTeams$, clientFeedback$, resources$, projectUpdates$, meetingMinutes$])
//       .subscribe(([approvedTeamsData, clientFeedbackData, resourcesData, projectUpdatesData, meetingMinutesData]) => {
//         console.log('Approved Teams Data:', approvedTeamsData);
//         console.log('Client Feedback Data:', clientFeedbackData);
//         console.log('Resources Data:', resourcesData);
//         console.log('Project Updates Data:', projectUpdatesData);
//         console.log('Meeting Minutes Data:', meetingMinutesData);

//         // Call a function to add data to the PDF
//         this.addDataToPdf(approvedTeamsData, clientFeedbackData, resourcesData, projectUpdatesData, meetingMinutesData);
//       }, error => {
//         console.error('Error fetching data:', error);
//       });
//   }

//   addDataToPdf(approvedTeamsData: any, clientFeedbackData: any, resourcesData: any, projectUpdatesData: any, meetingMinutesData: any) {
//     const doc = new jsPDF();

//     let yOffset = 10;

//     // Add Approved Teams data to PDF
//     doc.setFontSize(16);
//     doc.text('Approved Teams', 10, yOffset);
//     yOffset += 20;
//     approvedTeamsData.forEach((team: any) => {
//       doc.text(`Project ID: ${team.projectId}`, 10, yOffset);
//       yOffset += 10;
//       // Add other fields as needed
//     });

//     // Add Client Feedback data to PDF
//     doc.addPage();
//     yOffset = 10;
//     doc.setFontSize(16);
//     doc.text('Client Feedback', 10, yOffset);
//     yOffset += 20;
//     clientFeedbackData.forEach((feedback: any) => {
//       doc.text(`Project ID: ${feedback.projectId}`, 10, yOffset);
//       yOffset += 10;
//       // Add other fields as needed
//     });

//     // Add Resources data to PDF
//     // Add Project Updates data to PDF
//     // Add Meeting Minutes data to PDF

//     // Save the PDF
//     doc.save('project_details.pdf');
//   }

