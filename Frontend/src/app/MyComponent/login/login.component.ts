import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


//   constructor(public auth: AuthService) {}

//   ngOnInit(): void{

//   }
// login(): void {
// this.auth.loginWithRedirect();
//   }
constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

}
