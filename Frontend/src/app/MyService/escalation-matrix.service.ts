import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../apiendpoint';
import { EscalationMatrix } from '../models/EscalationMatrix';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscalationMatrixService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); // Assuming apiEndPoint() returns the base URL for our backend API
  }

  getAllEscalationMatrixEntries(): Observable<EscalationMatrix[]> {
    return this.http.get<EscalationMatrix[]>(`${this.baseUrl}escalation-matrix?MaxResultCount=1000`);
  }

  createEscalationMatrix(escalationMatrixData: EscalationMatrix): Observable<EscalationMatrix> {
    return this.http.post<EscalationMatrix>(`${this.baseUrl}escalation-matrix`, escalationMatrixData);
  }

  getEscalationMatrixEntryById(id: string): Observable<EscalationMatrix> {
    return this.http.get<EscalationMatrix>(`${this.baseUrl}escalation-matrix/${id}`);
  }

  updateEscalationMatrixEntry(id: string, escalationMatrixData: EscalationMatrix): Observable<EscalationMatrix> {
    return this.http.put<EscalationMatrix>(`${this.baseUrl}escalation-matrix/${id}`, escalationMatrixData);
  }

  deleteEscalationMatrixEntry(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}escalation-matrix/${id}`);
  }
  
}
