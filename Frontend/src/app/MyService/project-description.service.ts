import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../apiendpoint';
import { ProjectDescription } from '../models/project-description';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectDescriptionService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllProjectDescriptions(): Observable<ProjectDescription[]> {
    return this.http.get<ProjectDescription[]>(`${this.baseUrl}project-description`);
  }

  getProjectDescriptionById(id: string): Observable<ProjectDescription> {
    return this.http.get<ProjectDescription>(`${this.baseUrl}project-description/${id}`);
  }

  createProjectDescription(projectDescriptionData: ProjectDescription): Observable<ProjectDescription> {
    return this.http.post<ProjectDescription>(`${this.baseUrl}project-description`, projectDescriptionData);
  }

  updateProjectDescription(id: string, projectDescriptionData: ProjectDescription): Observable<ProjectDescription> {
    return this.http.put<ProjectDescription>(`${this.baseUrl}project-description/${id}`, projectDescriptionData);
  }

  deleteProjectDescription(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}project-description/${id}`);
  }
}
