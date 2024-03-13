import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../apiendpoint';
import { VersionHistory } from '../models/version-history';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VersionHistoryService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); // Assuming apiEndPoint() returns the base URL for our backend API
  }

  getAllVersionHistory(): Observable<VersionHistory[]> {
    return this.http.get<VersionHistory[]>(`${this.baseUrl}version-history`);
  }

  getVersionHistoryById(id: string): Observable<VersionHistory> {
    return this.http.get<VersionHistory>(`${this.baseUrl}version-history/${id}`);
  }

  createVersionHistory(versionHistoryData: VersionHistory): Observable<VersionHistory> {
    return this.http.post<VersionHistory>(`${this.baseUrl}version-history`, versionHistoryData);
  }

  updateVersionHistory(id: string, versionHistoryData: VersionHistory): Observable<VersionHistory> {
    return this.http.put<VersionHistory>(`${this.baseUrl}version-history/${id}`, versionHistoryData);
  }

  deleteVersionHistory(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}version-history/${id}`);
  }
}
