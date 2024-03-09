import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { apiEndPoint } from '../apiendpoint';
import { NewProject } from '../models/new-project';

@Injectable({
  providedIn: 'root'
})
export class NewProjectService {
  // private baseUrl: string;

  // constructor(private http: HttpClient) {
  //   this.baseUrl = apiEndPoint();
  // }

  // getAllProjects(): Observable<NewProject[]> {
  //   return this.http.get<NewProject[]>(`${this.baseUrl}project`);
  // }
  
  // createProject(projectData: NewProject): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}project`, projectData);
  // }

  // getProjectById(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}project/${id}`);
  // }

  // updateProject(id: string, projectData: NewProject): Observable<any> {
  //   return this.http.put<any>(`${this.baseUrl}project/${id}`, projectData);
  // }

  // deleteProject(id: string): Observable<any> {
  //   return this.http.delete<any>(`${this.baseUrl}project/${id}`);
  // }




  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint();
  }

  getAllProjects(): Observable<NewProject[]> {
    return this.http.get<NewProject[]>(`${this.baseUrl}project`);
  }
  
  createProject(projectData: NewProject): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}project`, projectData);
  }

  getProjectById(id: string): Observable<NewProject> {
    return this.http.get<NewProject>(`${this.baseUrl}project/${id}`);
  }

  updateProjectById(id: string, projectName: string, description: string): Observable<any> {
    const updatedProject = { projectName, description };
    return this.http.put<any>(`${this.baseUrl}project/${id}`, updatedProject);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}project/${id}`);
  }




}
