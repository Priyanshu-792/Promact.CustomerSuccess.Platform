import { Component } from '@angular/core';
import { AuthService } from '../../MyService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string ='';
  password: string ='';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password)
      .subscribe(
        (data) => {
          console.log('Login successful:', data);
          // Redirect or perform other actions after successful login
        },
        (error) => {
          console.log('Login failed:', error);
        }
      );
  }
}
