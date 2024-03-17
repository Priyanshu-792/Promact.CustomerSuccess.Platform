import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResourcesService } from '../../MyService/resources.service';
import { NewProject } from '../../models/new-project';
import { NewProjectService } from '../../MyService/new-project.service';
import { Resource } from '../../models/resources';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
})
export class ResourcesComponent implements OnInit {
  @Input() projectId!: string; // Define projectId property
  resourceForm!: FormGroup;
  projects: NewProject[] = [];
  resources: Resource[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private resourceService: ResourcesService,
    private newProjectService: NewProjectService
  ) {}

  ngOnInit(): void {
    this.resourceForm = this.formBuilder.group({
      projectId: [this.projectId, Validators.required],
      resourceName: ['', Validators.required],
      allocationPercentage: [0, Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      role: ['', Validators.required],
      comment: [''],
    });

    this.loadProjects();
    this.loadResources();
  }

  pName!: string;
  loadProjects(): void {
    this.newProjectService.getAllProjects('project').subscribe(
      (data: any) => {
        this.projects = data.items.map((project: any) => ({
          id: project.id,
          projectName: project.name,
        }));

        this.projects.forEach((project: any) => {
          if (project.id === this.projectId) {
            this.pName = project.projectName;
          }
        });
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.resourceForm.valid) {
      this.resourceService.createResource(this.resourceForm.value).subscribe(
        (response: any) => {
          console.log('Resource created successfully:', response);
          // Optionally, perform any additional actions upon successful creation
          this.resourceForm.reset({ projectId: this.projectId });
          this.loadResources();
        },
        (error) => {
          console.error('Error creating resource:', error);
          // Optionally, handle error if needed
        }
      );
    } else {
      // Form is invalid, handle accordingly
    }
  }

  loadResources(): void {
    this.resourceService.getAllResources().subscribe(
      (data: any) => {
        this.resources = data.items.filter(
          (resource: Resource) => resource.projectId === this.projectId
        );
      },
      (error) => {
        console.error('Error loading resources:', error);
      }
    );
  }

  downloadAsPdf() {
    this.resourceService.getAllResources().subscribe(
      (data: any) => {
        console.log('Received resource data:', data); // Log received data

        const resourceData: Resource[] = data.items.map((resource: any) => ({
          projectId: resource.projectId,
          resourceName: resource.resourceName,
          allocationPercentage: resource.allocationPercentage,
          start: new Date(resource.start),
          end: new Date(resource.end),
          role: resource.role,
          comment: resource.comment,
        }));

        // Filter resources based on the project ID
        const filteredResources = resourceData.filter(
          (resource) => resource.projectId === this.projectId
        );

        if (filteredResources.length === 0) {
          console.log('No resources found for the specified project ID.');
          return; 
        }

        const doc = new jsPDF();
        let yOffset = 10;
        let currentPage = 1;
        const maxPageHeight = doc.internal.pageSize.height - 20; // Maximum height of each page

        filteredResources.forEach((resource) => {
          // Check if adding the current resource would exceed the page height
          if (yOffset + 50 > maxPageHeight) {
            doc.addPage(); 
            yOffset = 10; // Reset yOffset for the new page
            currentPage++;
          }

          // Add resource name as heading
          doc.text(`Resource Name: ${resource.resourceName}`, 10, yOffset);
          yOffset += 10;

          doc.text(
            `Allocation Percentage: ${resource.allocationPercentage}%`,
            20,
            yOffset
          );
          yOffset += 10;
          doc.text(
            `Start Date: ${resource.start.toLocaleDateString()}`,
            20,
            yOffset
          );
          yOffset += 10;
          doc.text(
            `End Date: ${resource.end.toLocaleDateString()}`,
            20,
            yOffset
          );
          yOffset += 10;
          doc.text(`Role: ${resource.role}`, 20, yOffset);
          yOffset += 10;
          doc.text(`Comment: ${resource.comment}`, 20, yOffset);
          yOffset += 10;

          // Add spacing between resources
          yOffset += 10;
        });

        // Save the PDF with appropriate file name
        doc.save(`Resources_${currentPage}_Pages.pdf`);
      },
      (error) => {
        console.error('Error fetching resources:', error);
      }
    );
  }
}
