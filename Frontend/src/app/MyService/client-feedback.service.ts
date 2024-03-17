import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../apiendpoint';
import { Observable } from 'rxjs';
import { ClientFeedback } from '../models/client-feedback';

@Injectable({
  providedIn: 'root'
})
export class ClientFeedbackService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllClientFeedbacks(): Observable<ClientFeedback[]> {
    return this.http.get<ClientFeedback[]>(`${this.baseUrl}client-feedback`);
  }

  createClientFeedback(clientFeedbackData: ClientFeedback): Observable<ClientFeedback> {
    return this.http.post<ClientFeedback>(`${this.baseUrl}client-feedback`, clientFeedbackData);
  }

  getClientFeedbackById(id: string): Observable<ClientFeedback> {
    return this.http.get<ClientFeedback>(`${this.baseUrl}client-feedback/${id}`);
  }

  updateClientFeedback(id: string, clientFeedbackData: ClientFeedback): Observable<ClientFeedback> {
    return this.http.put<ClientFeedback>(`${this.baseUrl}client-feedback/${id}`, clientFeedbackData);
  }

  deleteClientFeedback(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}client-feedback/${id}`);
  }
}
