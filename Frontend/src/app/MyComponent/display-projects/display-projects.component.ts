import { Component, OnInit } from '@angular/core';
import { NewProjectService } from '../../MyService/new-project.service';
import { NewProject } from '../../models/new-project';

@Component({
  selector: 'app-display-projects',
  templateUrl: './display-projects.component.html',
  styleUrl: './display-projects.component.css'
})
export class DisplayProjectsComponent implements OnInit {
  // this code is for trying for universal service and it is successful can take as a final code
  projects: NewProject[] = [];
  projectIds: string[] = [];

  constructor(private projectService: NewProjectService) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    // Pass 'project' as the last word to getAllProjects method
    this.projectService.getAllProjects('project').subscribe(
      (data: any) => {
        console.log('Projects:', data); // Log the retrieved data
        this.projects = data.items.map((project: any) => ({ id: project.id, projectName: project.name, description: project.description }));
        this.projectIds = data.items.map((project: any) => project.id); // Add this line
      },
      error => {
        console.error('Error loading projects:', error); // Log any errors
      }
    );
  }

  editProject(id: string): void {
    // Call getProjectById and pass 'project' as the last word
    this.projectService.getProjectById('project', id).subscribe(
      (project: NewProject) => {
        // Update the project details here
      },
      error => {
        console.error('Error fetching project details:', error); // Log any errors
      }
    );
  }

  deleteProject(id: string): void {
    // Calling service method to delete the project by id
    this.projectService.deleteProject('project', id).subscribe(
      () => {
        console.log('Project deleted successfully');
        this.loadProjects();
      },
      error => {
        console.error('Error deleting project:', error); // Log any errors
      }
    );
  }

}










// just for trial of edit button which is not working fine
//   projects: NewProject[] = [];
//   projectIds: string[] = [];

//   constructor(private projectService: NewProjectService) { }

//   ngOnInit(): void {
//     this.loadProjects();
//   }

//   loadProjects(): void {
//     this.projectService.getAllProjects().subscribe(
//       (data: any) => {
//         this.projects = data.items.map((project: any) => ({
//           id: project.id,
//           projectName: project.name,
//           description: project.description,
//           isEditable: false
//         }));
//         this.projectIds = data.items.map((project: any) => project.id);
//       },
//       error => {
//         console.error('Error loading projects:', error);
//       }
//     );
//   }

//   editProject(index: number): void {
//     this.projects[index].isEditable = true;
//   }

//   cancelEdit(index: number): void {
//     this.projects[index].isEditable = false;
//     // Reset project name and description if needed
//     // this.projects[index].projectName = this.originalProjectName;
//     // this.projects[index].description = this.originalDescription;
//   }

//   saveProject(id: string, newName: string, newDescription: string): void {
//     this.projectService.updateProjectById(id, newName, newDescription).subscribe(
//       () => {
//         console.log('Project updated successfully');
//         this.loadProjects();
//       },
//       error => {
//         console.error('Error updating project:', error);
//       }
//     );
//   }

//   deleteProject(id: string): void {
//     this.projectService.deleteProject(id).subscribe(
//       () => {
//         console.log('Project deleted successfully');
//         this.loadProjects();
//       },
//       error => {
//         console.error('Error deleting project:', error);
//       }
//     );
//   }


