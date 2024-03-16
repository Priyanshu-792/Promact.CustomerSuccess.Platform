import { Component, OnInit } from '@angular/core';
import { NewProjectService } from '../../MyService/new-project.service';
import { NewProject } from '../../models/new-project';

@Component({
  selector: 'app-display-projects',
  templateUrl: './display-projects.component.html',
  styleUrl: './display-projects.component.css',
})
export class DisplayProjectsComponent implements OnInit {
  projects: NewProject[] = [];
  projectIds: string[] = [];

  constructor(private projectService: NewProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    // Pass 'project' as the last word to getAllProjects method
    this.projectService.getAllProjects('project').subscribe(
      (data: any) => {
        console.log('Projects:', data);
        this.projects = data.items.map((project: any) => ({
          id: project.id,
          projectName: project.name,
          description: project.description,
        }));
        this.projectIds = data.items.map((project: any) => project.id); // Add this line
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    );
  }

  editProject(id: string): void {
    this.projectService.getProjectById('project', id).subscribe(
      (project: NewProject) => {},
      (error) => {
        console.error('Error fetching project details:', error); // Log any errors
      }
    );
  }

  deleteProject(id: string): void {
    this.projectService.deleteProject('project', id).subscribe(
      () => {
        console.log('Project deleted successfully');
        this.loadProjects();
      },
      (error) => {
        console.error('Error deleting project:', error); // Log any errors
      }
    );
  }
}
