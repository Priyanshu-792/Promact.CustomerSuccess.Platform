import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  constructor(private router: Router) {}


  createNewProject() {
    this.router.navigate(['/new-project']); // Navigate to the New Project component
  }

  openProjects(){
    
  }
}
