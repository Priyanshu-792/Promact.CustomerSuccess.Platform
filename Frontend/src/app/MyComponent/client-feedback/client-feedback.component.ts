import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientFeedbackService } from '../../MyService/client-feedback.service';
import { NewProject } from '../../models/new-project';
import { NewProjectService } from '../../MyService/new-project.service';
import { ClientFeedback } from '../../models/client-feedback';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-client-feedback',
  templateUrl: './client-feedback.component.html',
  styleUrl: './client-feedback.component.css'
})
export class ClientFeedbackComponent implements OnInit {
 //this code is for trying with dropdown and it worked successfully
 @Input() projectId!: string;
 feedbackForm!: FormGroup;
 projects: NewProject[] = [];
 clientFeedbacks: ClientFeedback[] = []; 

 constructor(
   private formBuilder: FormBuilder,
   private clientFeedbackService: ClientFeedbackService,
   private newProjectService: NewProjectService
 ) { }

 ngOnInit(): void {
   // Initialize the feedback form
   this.feedbackForm = this.formBuilder.group({
     projectId: [this.projectId, Validators.required],
     feedbackType: ['', Validators.required],
     dateReceived: ['', Validators.required],
     detailedFeedback: ['', Validators.required],
     actionTaken: ['', Validators.required],
     closureDate: ['', Validators.required]
   });

   // Load projects for dropdown
   this.loadProjects();
   this.loadClientFeedbacks();
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
        // Call the service to create a new client feedback entry
        this.clientFeedbackService.createClientFeedback(this.feedbackForm.value).subscribe(
          (response: any) => {
            // Handle success response if needed
            console.log('Client feedback created successfully:', response);
            // Reset the form after successful submission
            this.feedbackForm.reset({ projectId: this.projectId});
            this.loadClientFeedbacks();
          },
          error => {
            // Handle error if needed
            console.error('Error creating client feedback:', error);
          }
        );
      } else {
        // Form is invalid, handle accordingly
      }
 }


 loadClientFeedbacks(): void {
  this.clientFeedbackService.getAllClientFeedbacks().subscribe(
    (data: any) => {
      this.clientFeedbacks = data.items.filter((feedback: ClientFeedback) => feedback.projectId === this.projectId);
      // Assuming data.items contains client feedbacks
    },
    error => {
      console.error('Error loading client feedbacks:', error);
    }
  );
}


//download as pdf
downloadAsPdf() {
  this.clientFeedbackService.getAllClientFeedbacks().subscribe((data: any) => {
    console.log('Received client feedback data:', data); // Log received data

    const clientFeedbackData: ClientFeedback[] = data.items.map((feedback: any) => ({
      feedbackType: feedback.feedbackType,
      dateReceived: new Date(feedback.dateReceived),
      detailedFeedback: feedback.detailedFeedback,
      actionTaken: feedback.actionTaken,
      closureDate: new Date(feedback.closureDate),
      projectId: feedback.projectId // Ensure projectId is included
    }));

    // Filter client feedback based on the project ID
    const filteredFeedback = clientFeedbackData.filter(feedback => feedback.projectId === this.projectId);

    if (filteredFeedback.length === 0) {
      console.log('No client feedback found for the specified project ID.');
      return; // Exit function if no feedback is found
    }

    const doc = new jsPDF();
    let yOffset = 10;
    let currentPage = 1;
    const maxPageHeight = doc.internal.pageSize.height - 20; // Maximum height of each page

    filteredFeedback.forEach(feedback => {
      // Check if adding the current feedback would exceed the page height
      if (yOffset + 50 > maxPageHeight) {
        doc.addPage(); // Add a new page
        yOffset = 10; // Reset yOffset for the new page
        currentPage++;
      }

      // Add feedback type as heading
      doc.text(`Feedback Type: ${feedback.feedbackType}`, 20, yOffset);
      yOffset += 10;

      // Add other data fields below feedback type
      doc.text(`Date Received: ${feedback.dateReceived.toLocaleDateString()}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Detailed Feedback: ${feedback.detailedFeedback}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Action Taken: ${feedback.actionTaken}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Closure Date: ${feedback.closureDate.toLocaleDateString()}`, 20, yOffset);
      yOffset += 10;

      // Add spacing between feedback
      yOffset += 10;
    });

    // Save the PDF with appropriate file name
    doc.save(`Latest_client_feedback_of_${currentPage}Pages.pdf`);
  }, error => {
    console.error('Error fetching client feedback:', error);
  });
}

}
