import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../apiendpoint';
import { Observable } from 'rxjs';
import { ApprovedTeam } from '../models/approved-team';

@Injectable({
  providedIn: 'root'
})
export class ApprovedTeamService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); // Assuming apiEndPoint() returns the base URL for your backend API
  }

  getAllApprovedTeams(): Observable<ApprovedTeam[]> {
    return this.http.get<ApprovedTeam[]>(`${this.baseUrl}approved-team?MaxResultCount=1000`);
  }

  createApprovedTeam(approvedTeamData: ApprovedTeam): Observable<ApprovedTeam> {
    return this.http.post<ApprovedTeam>(`${this.baseUrl}approved-team`, approvedTeamData);
  }

  getApprovedTeamById(id: string): Observable<ApprovedTeam> {
    return this.http.get<ApprovedTeam>(`${this.baseUrl}approved-team/${id}`);
  }

  updateApprovedTeam(id: string, approvedTeamData: ApprovedTeam): Observable<ApprovedTeam> {
    return this.http.put<ApprovedTeam>(`${this.baseUrl}approved-team/${id}`, approvedTeamData);
  }

  deleteApprovedTeam(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}approved-team/${id}`);
  }
}
