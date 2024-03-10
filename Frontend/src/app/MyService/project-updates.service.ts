import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../apiendpoint';
import { Observable } from 'rxjs';
import { ProjectUpdates } from '../models/project-updates';

@Injectable({
  providedIn: 'root'
})
export class ProjectUpdatesService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint();
  }

  getAllProjectUpdates(): Observable<ProjectUpdates[]> {
    return this.http.get<ProjectUpdates[]>(`${this.baseUrl}project-update`);
  }

  getProjectUpdateById(id: string): Observable<ProjectUpdates> {
    return this.http.get<ProjectUpdates>(`${this.baseUrl}project-update/${id}`);
  }

  createProjectUpdate(projectUpdate: ProjectUpdates): Observable<ProjectUpdates> {
    return this.http.post<ProjectUpdates>(`${this.baseUrl}project-update`, projectUpdate);
  }

  updateProjectUpdate(id: string, projectUpdate: ProjectUpdates): Observable<ProjectUpdates> {
    return this.http.put<ProjectUpdates>(`${this.baseUrl}project-update/${id}`, projectUpdate);
  }

  deleteProjectUpdate(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}project-update/${id}`);
  }
}
