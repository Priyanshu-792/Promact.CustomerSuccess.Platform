import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../apiendpoint';
import { Sprint } from '../models/sprint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); // Assuming apiEndPoint() returns the base URL for our backend API
  }

  getAllSprints(): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.baseUrl}sprint`);
  }

  getSprintById(id: string): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.baseUrl}sprint/${id}`);
  }

  createSprint(sprintData: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.baseUrl}sprint`, sprintData);
  }

  updateSprint(id: string, sprintData: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.baseUrl}sprint/${id}`, sprintData);
  }

  deleteSprint(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}sprint/${id}`);
  }
}
