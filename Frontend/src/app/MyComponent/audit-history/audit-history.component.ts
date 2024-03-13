import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditHistory } from '../../models/audit-history';
import { AuditHistoryService } from '../../MyService/audit-history.service';
import jsPDF from 'jspdf';
import { NewProject } from '../../models/new-project';
import { NewProjectService } from '../../MyService/new-project.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private auditHistoryService: AuditHistoryService,
    private newProjectService: NewProjectService
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
    if (this.auditHistoryForm.valid) {
      // Call the service to create a new audit history entry
      this.auditHistoryService.createAuditHistory(this.auditHistoryForm.value).subscribe(
        (response: any) => {
          // Handle success response if needed
          console.log('Audit history created successfully:', response);
          // Reset the form after successful submission
          this.auditHistoryForm.reset({ projectId: this.projectId });
          this.loadAuditHistory();
        },
        error => {
          // Handle error if needed
          console.error('Error creating audit history:', error);
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }

  loadAuditHistory(): void {
    this.auditHistoryService.getAllAuditHistory().subscribe(
      (data: any) => {
        this.auditHistoryEntries = data.items.filter((entry: AuditHistory) => entry.projectId === this.projectId);
        // Assuming data.items contains audit history entries
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
        return; // Exit function if no history is found
      }

      const doc = new jsPDF();
      let yOffset = 10;
      let currentPage = 1;
      const maxPageHeight = doc.internal.pageSize.height - 20; // Maximum height of each page

      filteredHistory.forEach(entry => {
        // Check if adding the current entry would exceed the page height
        if (yOffset + 50 > maxPageHeight) {
          doc.addPage(); // Add a new page
          yOffset = 10; // Reset yOffset for the new page
          currentPage++;
        }

        // Add entry details to the PDF
        doc.text(`Project ID: ${entry.projectId}`, 20, yOffset);
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

        // Add spacing between entries
        yOffset += 10;
      });

      // Save the PDF with appropriate file name
      doc.save(`Audit_History_of_${currentPage}Pages.pdf`);
    }, error => {
      console.error('Error fetching audit history:', error);
    });
  }
}
