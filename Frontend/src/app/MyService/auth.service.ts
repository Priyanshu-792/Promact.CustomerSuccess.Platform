import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>('', { username, password })
      .pipe(
        tap(response => {
          // Assuming Auth0 returns access token in response
          const accessToken = response.access_token;
          // Store access token securely (e.g., in local storage)
          localStorage.setItem('access_token', accessToken);
        })
      );
  }

  logout() {
    // Clear access token from storage upon logout
    localStorage.removeItem('access_token');
  }

  getAccessToken(): string | null {
    // Retrieve access token from storage
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    // Check if access token is present
    return !!this.getAccessToken();
  }
}
