
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auditor',
  templateUrl: './auditor.component.html',
  styleUrl: './auditor.component.css'
})
export class AuditorComponent {
constructor(public auth: AuthService){}
ngOnInit(): void{
  
}

}
