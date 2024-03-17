import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewProject } from '../../models/new-project';
import { ScopeService } from '../../MyService/scope.service';
import { NewProjectService } from '../../MyService/new-project.service';
import { Scope } from '../../models/scope';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrl: './scope.component.css'
})
export class ScopeComponent implements OnInit{
  @Input() projectId!: string;
  scopeForm!: FormGroup;
  projects: NewProject[] = [];
  scopeEntries: Scope[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private scopeService: ScopeService, 
    private newProjectService: NewProjectService 
  ) { }

  ngOnInit(): void {
    this.scopeForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      technology: ['', Validators.required],
      scopeDetails: ['', Validators.required]
    });

    this.loadProjects();
    this.loadClientFeedbacks();
  }

  pName!: string;

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

  loadClientFeedbacks(): void {
    this.scopeService.getAllScopes().subscribe(
      (data: any) => {
        this.scopeEntries = data.items.filter((scope: Scope) => scope.projectId === this.projectId);
      },
      error => {
        console.error('Error loading client feedbacks:', error);
      }
    );
  }

  onSubmit() {
  
    if (this.scopeForm.valid) {
      console.log("checking");
      this.scopeService.createScope(this.scopeForm.value).subscribe(
        (response: any) => {
          console.log('Scope created successfully:', response);
          this.scopeForm.reset({ projectId: this.projectId });
          this.loadClientFeedbacks();
        },
        error => {
          console.error('Error creating scope:', error);
        }
      );
    } else {
    }
  }


  // Download as PDF
downloadAsPdf() {
  if (this.scopeEntries.length === 0) {
    console.log('No scope entries found for the specified project ID.');
    return;
  }

  const doc = new jsPDF();
  let yOffset = 10;
  let currentPage = 1;
  const maxPageHeight = doc.internal.pageSize.height - 20;

  this.scopeEntries.forEach(entry => {
    if (yOffset + 50 > maxPageHeight) {
      doc.addPage();
      yOffset = 10;
      currentPage++;
    }

    // Add scope entry details
    doc.text(`Technology: ${entry.technology}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Scope Details: ${entry.scopeDetails}`, 20, yOffset);
    yOffset += 10;
    yOffset += 10; // Add spacing between scope entries
  });

  doc.save(`Scope_entries_for_${currentPage}Pages.pdf`);
}


}
