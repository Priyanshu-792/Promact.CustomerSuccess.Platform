import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../apiendpoint';
import { AuditHistory } from '../models/audit-history';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditHistoryService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllAuditHistory(): Observable<AuditHistory[]> {
    return this.http.get<AuditHistory[]>(`${this.baseUrl}audit-history?MaxResultCount=1000`);
  }

  createAuditHistory(auditHistoryData: AuditHistory): Observable<AuditHistory> {
    return this.http.post<AuditHistory>(`${this.baseUrl}audit-history`, auditHistoryData);
  }

  getAuditHistoryById(id: string): Observable<AuditHistory> {
    return this.http.get<AuditHistory>(`${this.baseUrl}audit-history/${id}`);
  }

  updateAuditHistory(id: string, auditHistoryData: AuditHistory): Observable<AuditHistory> {
    return this.http.put<AuditHistory>(`${this.baseUrl}audit-history/${id}`, auditHistoryData);
  }

  deleteAuditHistory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}audit-history/${id}`);
  }
}
