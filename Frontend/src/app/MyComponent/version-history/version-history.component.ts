import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VersionHistoryService } from '../../MyService/version-history.service';
import { NewProject } from '../../models/new-project';

import { NewProjectService } from '../../MyService/new-project.service';
import jsPDF from 'jspdf';
import { VersionHistory } from '../../models/version-history';

@Component({
  selector: 'app-version-history',
  templateUrl: './version-history.component.html',
  styleUrl: './version-history.component.css'
})
export class VersionHistoryComponent {
  @Input() projectId!: string;
  versionHistoryForm!: FormGroup;
  projects: NewProject[] = [];
  versionHistoryEntries: VersionHistory[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private versionHistoryService: VersionHistoryService,
    private newProjectService: NewProjectService
  ) { }

  ngOnInit(): void {
    // Initialize the version history form
    this.versionHistoryForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      changeType: ['', Validators.required],
      changes: ['', Validators.required],
      changeReason: ['', Validators.required],
      revisionDate: ['', Validators.required],
      approvalDate: ['', Validators.required],
      approvedBy: ['', Validators.required]
    });

     this. loadProjects();
    this.loadVersionHistory();
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
    if (this.versionHistoryForm.valid) {
      // Call the service to create a new version history entry
      this.versionHistoryService.createVersionHistory(this.versionHistoryForm.value).subscribe(
        (response: any) => {
          // Handle success response if needed
          console.log('Version history created successfully:', response);
          // Reset the form after successful submission
          this.versionHistoryForm.reset({ projectId: this.projectId });
          this.loadVersionHistory();
        },
        error => {
          // Handle error if needed
          console.error('Error creating version history:', error);
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }

  loadVersionHistory(): void {
    this.versionHistoryService.getAllVersionHistory().subscribe(
      (data: any) => {
        this.versionHistoryEntries = data.items.filter((entry: VersionHistory) => entry.projectId === this.projectId);
        // Assuming data.items contains version history entries
      },
      error => {
        console.error('Error loading version history:', error);
      }
    );
  }

  downloadAsPdf() {
    this.versionHistoryService.getAllVersionHistory().subscribe((data: any) => {
      console.log('Received version history data:', data); // Log received data

      const versionHistoryData: VersionHistory[] = data.items.map((entry: any) => ({
        changeType: entry.changeType,
        changes: entry.changes,
        changeReason: entry.changeReason,
        revisionDate: new Date(entry.revisionDate),
        approvalDate: new Date(entry.approvalDate),
        approvedBy: entry.approvedBy,
        projectId: entry.projectId // Ensure projectId is included
      }));

      // Filter version history based on the project ID
      const filteredHistory = versionHistoryData.filter(entry => entry.projectId === this.projectId);

      if (filteredHistory.length === 0) {
        console.log('No version history found for the specified project ID.');
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
        doc.text(`Change Type: ${entry.changeType}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Changes: ${entry.changes}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Change Reason: ${entry.changeReason}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Revision Date: ${entry.revisionDate.toLocaleDateString()}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Approval Date: ${entry.approvalDate.toLocaleDateString()}`, 20, yOffset);
        yOffset += 10;
        doc.text(`Approved By: ${entry.approvedBy}`, 20, yOffset);
        yOffset += 10;

        // Add spacing between entries
        yOffset += 10;
      });

      // Save the PDF with appropriate file name
      doc.save(`Version_History_of_${currentPage}Pages.pdf`);
    }, error => {
      console.error('Error fetching version history:', error);
    });
  }

}
