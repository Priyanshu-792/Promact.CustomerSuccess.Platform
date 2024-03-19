
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NewProjectService } from '../../MyService/new-project.service';

@Component({
  selector: 'app-auditor',
  templateUrl: './auditor.component.html',
  styleUrl: './auditor.component.css'
})
export class AuditorComponent implements OnInit {
constructor(public auth: AuthService,
  private dataService: NewProjectService
  ){}
  projectNames: string[] = []; 
totalProjects: number=5; 
inProgress: number = 2; 
completed: number = 2; 
onHold: number = 1; 

ngOnInit(): void{
  setInterval(() => {
    this.calculateTotalProjectsCount();
  }, 400);
  this.calculateTotalProjectsCount();
}

calculateTotalProjectsCount() {
  this.dataService.getAllProjects('project').subscribe(
    (data: any) => {
      this.projectNames = data.items.map((project: any) => project.projectName);
      this.totalProjects = this.projectNames.length; 
    },
    (error) => {
      console.error('Error loading projects:', error);
    }
  );
}


}
