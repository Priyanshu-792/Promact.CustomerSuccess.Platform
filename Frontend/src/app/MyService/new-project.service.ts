import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { apiEndPoint } from '../apiendpoint';
import { NewProject } from '../models/new-project';

@Injectable({
  providedIn: 'root'
})
export class NewProjectService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint();
  }

  getAllProjects(lastWord: string): Observable<NewProject[]> {
    return this.http.get<NewProject[]>(`${this.baseUrl}${lastWord}?MaxResultCount=1000`);
  }
  
  createProject(lastWord: string, projectData: NewProject): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${lastWord}`, projectData);
  }

  getProjectById(lastWord: string, id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${lastWord}/${id}`);
  }

  updateProject(lastWord: string, id: string, projectData: NewProject): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${lastWord}/${id}`, projectData);
  }

  deleteProject(lastWord: string, id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}${lastWord}/${id}`);
  }



}
