
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auditor',
  templateUrl: './auditor.component.html',
  styleUrl: './auditor.component.css'
})
export class AuditorComponent implements OnInit {
constructor(public auth: AuthService,

  ){}

totalProjects: number=10; 
inProgress: number = 5; 
completed: number = 3; 
onHold: number = 2; 
ngOnInit(): void{
}


}
