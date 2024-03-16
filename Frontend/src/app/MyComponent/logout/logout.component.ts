import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{
constructor(public auth:AuthService, @Inject(DOCUMENT) public document: Document)
{
}
ngOnInit(): void{
  
}
logout(): void{
  this.auth.logout({logoutParams: {returnTo: this.document.location.origin}})
}
}
