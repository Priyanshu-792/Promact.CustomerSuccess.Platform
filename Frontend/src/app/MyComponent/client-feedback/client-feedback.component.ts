import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientFeedbackService } from '../../MyService/client-feedback.service';

@Component({
  selector: 'app-client-feedback',
  templateUrl: './client-feedback.component.html',
  styleUrl: './client-feedback.component.css'
})
export class ClientFeedbackComponent {
  feedbackForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private clientFeedbackService: ClientFeedbackService) { }

  ngOnInit(): void {
    // Initialize the feedback form
    this.feedbackForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      feedbackType: ['', Validators.required],
      dateReceived: ['', Validators.required],
      detailedFeedback: ['', Validators.required],
      actionTaken: ['', Validators.required],
      closureDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      // Call the service to create a new client feedback entry
      this.clientFeedbackService.createClientFeedback(this.feedbackForm.value).subscribe(
        (response: any) => {
          // Handle success response if needed
          console.log('Client feedback created successfully:', response);
          // Reset the form after successful submission
          this.feedbackForm.reset();
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
}