import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>('', { username, password })
      .pipe(
        tap(response => {
          const accessToken = response.access_token;
          localStorage.setItem('access_token', accessToken);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
