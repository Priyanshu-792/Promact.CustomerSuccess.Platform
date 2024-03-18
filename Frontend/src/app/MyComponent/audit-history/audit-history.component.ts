import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditHistory } from '../../models/audit-history';
import { AuditHistoryService } from '../../MyService/audit-history.service';
import jsPDF from 'jspdf';
import { NewProject } from '../../models/new-project';
import { NewProjectService } from '../../MyService/new-project.service';
import { EmailService } from '../../MyService/email.service';
import { StakeHoldersService } from '../../MyService/stake-holders.service';
import { Stakeholder } from '../../models/stake-holders';
import { Email } from '../../models/email';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-audit-history',
  templateUrl: './audit-history.component.html',
  styleUrl: './audit-history.component.css'
})
export class AuditHistoryComponent {
  @Input() projectId!: string;
  auditHistoryForm!: FormGroup;
  auditHistoryEntries: AuditHistory[] = [];
  projects: NewProject[] = [];
  stakeholders: Stakeholder[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private auditHistoryService: AuditHistoryService,
    private newProjectService: NewProjectService,
    private emailService: EmailService,
    private stakeholderService: StakeHoldersService
  ) { }

  ngOnInit(): void {
    // Initialize the audit history form
    this.auditHistoryForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      dateOfAudit: ['', Validators.required],
      reviewedBy: ['', Validators.required],
      status: ['', Validators.required],
      reviewedSection: ['', Validators.required],
      commentOrQueries: ['', Validators.required],
      actionItem: ['', Validators.required]
    });

    this.loadProjects();
    this.loadAuditHistory();
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
   // Call the service to create a new audit history entry
  onSubmit() {
    if (this.auditHistoryForm.valid) {
      const formData = this.auditHistoryForm.value;
      this.auditHistoryService.createAuditHistory(formData).subscribe(
        (response: any) => {
          console.log('Audit history created successfully:', response);
          this.auditHistoryForm.reset({ projectId: this.projectId });
          this.loadAuditHistory();
          this.sendNotification(formData);
        },
        error => {
          console.error('Error creating audit history:', error);
        }
      );
    } else {
      
    }
  }

//this is where i added
loadStakeholders(): void {
  this.stakeholderService.getAllStakeholders().subscribe(
    (data: any) => {
      // Filter stakeholders based on the project ID
      this.stakeholders = data.items.filter((stakeholder: Stakeholder) => stakeholder.projectId === this.projectId);

      console.log('Stakeholders:', this.stakeholders);
    },
    (error) => {
      console.error('Error loading stakeholders:', error);
    }
  );
}

sendNotification(formData: any): void {
  const subject = 'Audit history is created';
  // Iterate over each stakeholder and send individual notifications
  this.stakeholders.forEach((stakeholder: Stakeholder) => {
    const stakeholderName = stakeholder.name;
    const body = `
    <div class="email-body">
      <div class="email-header">
        <h2>Hello ${stakeholderName},</h2>
  
        <p>Please note that the Audit History has been created. Here is the summary:</p>
  
        <table class="email-table">
          <tr>
            <td>Project Name:</td>
            <td>${this.pName}</td>
          </tr>
          <tr>
            <td>Date of Audit:</td>
            <td>${formData.dateOfAudit}</td>
          </tr>
          <tr>
            <td>Reviewed By:</td>
            <td>${formData.reviewedBy}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>${formData.status}</td>
          </tr>
          <tr>
            <td>Reviewed Section:</td>
            <td>${formData.reviewedSection}</td>
          </tr>
          <tr>
            <td>Comment / Queries:</td>
            <td>${formData.commentOrQueries} months</td>
          </tr>
          <tr>
          <td>Actions:</td>
          <td>${formData.actionItem} months</td>
        </tr> 
        </table>
        
        <p class="email-footer">For more details, visit our official website: <a href="https://promactinfo.com/">Promact Infotech Pvt Ltd</a></p>
        
        <p class="email-footer">Thanks and Regards,<br>Promact Infotech Pvt Ltd</p>
      </div>
    </div>
  `;
    const emails: Email[] = [
      {
        subject: subject,
        body: body,
        recipients: [stakeholder.contact] 
      },
    ];

    this.emailService.sendEmails(emails).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully mail sent!',
          text: 'Notification for the update of has been sent successfully to stakeholders.',
          timer: 4000,   
        });
        console.log(`Notification email sent successfully to ${stakeholderName}`);
      },
      (error) => {
        console.error(`Error sending notification email to ${stakeholderName}:`, error);
      }
    );
  });
}






//here it ends 
  loadAuditHistory(): void {
    this.auditHistoryService.getAllAuditHistory().subscribe(
      (data: any) => {
        this.auditHistoryEntries = data.items.filter((entry: AuditHistory) => entry.projectId === this.projectId);
        
      },
      error => {
        console.error('Error loading audit history:', error);
      }
    );
  }

  downloadAsPdf() {
    this.auditHistoryService.getAllAuditHistory().subscribe((data: any) => {
      console.log('Received audit history data:', data); // Log received data

      const auditHistoryData: AuditHistory[] = data.items.map((entry: any) => ({
        projectId: entry.projectId,
        dateOfAudit: new Date(entry.dateOfAudit),
        reviewedBy: entry.reviewedBy,
        status: entry.status,
        reviewedSection: entry.reviewedSection,
        commentOrQueries: entry.commentOrQueries,
        actionItem: entry.actionItem
      }));

      // Filter audit history based on the project ID
      const filteredHistory = auditHistoryData.filter(entry => entry.projectId === this.projectId);

      if (filteredHistory.length === 0) {
        console.log('No audit history found for the specified project ID.');
        return;
      }

      const doc = new jsPDF();
      let yOffset = 10;
      let currentPage = 1;
      const maxPageHeight = doc.internal.pageSize.height - 20; // Maximum height of each page

      filteredHistory.forEach(entry => {
        // Check if adding the current entry would exceed the page height
        if (yOffset + 50 > maxPageHeight) {
          doc.addPage(); 
          yOffset = 10; 
          currentPage++;
        }

        doc.text(`Project Name: ${this.pName}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Date of Audit: ${entry.dateOfAudit.toLocaleDateString()}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Reviewed By: ${entry.reviewedBy}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Status: ${entry.status}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Reviewed Section: ${entry.reviewedSection}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Comment or Queries: ${entry.commentOrQueries}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Action Item: ${entry.actionItem}`, 20, yOffset);
        yOffset += 10;

  
        yOffset += 10;
      });

      doc.save(`Audit_History_of_${currentPage}Pages.pdf`);
    }, error => {
      console.error('Error fetching audit history:', error);
    });
  }
}
