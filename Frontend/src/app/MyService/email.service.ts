import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from '../models/email';


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'https://localhost:44347/api/Email/send';

  constructor(private http: HttpClient) {}

  sendEmails(emails: Email[]): Observable<any> {
    if (!emails || emails.length === 0) {
      throw new Error('At least one email should be provided');
    }
    return this.http.post<any>(this.baseUrl, emails);
  }
}
