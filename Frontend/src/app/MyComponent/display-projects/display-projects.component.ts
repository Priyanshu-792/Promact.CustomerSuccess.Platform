import { Component, OnInit } from '@angular/core';
import { NewProjectService } from '../../MyService/new-project.service';
import { NewProject } from '../../models/new-project';

@Component({
  selector: 'app-display-projects',
  templateUrl: './display-projects.component.html',
  styleUrl: './display-projects.component.css'
})
export class DisplayProjectsComponent implements OnInit {
  projects: NewProject[] = [];

  constructor(private projectService: NewProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (data: NewProject[]) => {
        console.log('Projects:', data); // Log the retrieved data
        this.projects = data;
      },
      error => {
        console.error('Error loading projects:', error); // Log any errors
      }
    );
  }
}
