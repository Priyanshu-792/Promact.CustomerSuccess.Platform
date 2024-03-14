import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../apiendpoint';
import { PhaseMilestone } from '../models/phase-milestone';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhaseMilestoneService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); // Assuming apiEndPoint() returns the base URL for our backend API
  }

  getAllPhaseMilestones(): Observable<PhaseMilestone[]> {
    return this.http.get<PhaseMilestone[]>(`${this.baseUrl}phase-milestone`);
  }

  createPhaseMilestone(phaseMilestoneData: PhaseMilestone): Observable<PhaseMilestone> {
    return this.http.post<PhaseMilestone>(`${this.baseUrl}phase-milestone`, phaseMilestoneData);
  }

  getPhaseMilestoneById(id: string): Observable<PhaseMilestone> {
    return this.http.get<PhaseMilestone>(`${this.baseUrl}phase-milestone/${id}`);
  }

  updatePhaseMilestone(id: string, phaseMilestoneData: PhaseMilestone): Observable<PhaseMilestone> {
    return this.http.put<PhaseMilestone>(`${this.baseUrl}phase-milestone/${id}`, phaseMilestoneData);
  }

  deletePhaseMilestone(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}phase-milestone/${id}`);
  }
}
