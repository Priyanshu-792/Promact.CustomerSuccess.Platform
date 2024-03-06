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


  getAllProjects(): Observable<NewProject[]> {
    return this.http.get<any[]>(`${this.baseUrl}project`).pipe(
      map(data => {
        // Check if the returned data is an array
        if (Array.isArray(data)) {
          // Map each item in the array to a NewProject object
          return data.map(item => ({
            id: item.id,
            projectName: item.projectName,
            description: item.description
          }));
        } else {
          // If the data is not an array, return an empty array
          return [];
        }
      }),
      catchError(error => {
        // Handle errors here
        console.error('Error loading projects:', error);
        return [];
      })
    );
  }


  
  createProject(projectData: NewProject): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}project`, projectData);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}project/${id}`);
  }

  updateProject(id: string, projectData: NewProject): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}project/${id}`, projectData);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}project/${id}`);
  }






  // private baseUrl: string;

  // constructor(private http: HttpClient) {
  //   this.baseUrl = apiEndPoint();
  // }

  // getAllProjects(): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}project`);
  // }

  // createProject(projectData: any): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}project`, projectData);
  // }

  // getProjectById(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}project/${id}`);
  // }

  // updateProject(id: string, projectData: any): Observable<any> {
  //   return this.http.put<any>(`${this.baseUrl}project/${id}`, projectData);
  // }

  // deleteProject(id: string): Observable<any> {
  //   return this.http.delete<any>(`${this.baseUrl}project/${id}`);
  // }
}
