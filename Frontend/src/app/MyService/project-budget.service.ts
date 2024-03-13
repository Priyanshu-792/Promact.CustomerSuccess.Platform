import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../apiendpoint';
import { ProjectBudget } from '../models/project-budget';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectBudgetService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); // Assuming apiEndPoint() returns the base URL for our backend API
  }

  getAllProjectBudgets(): Observable<ProjectBudget[]> {
    return this.http.get<ProjectBudget[]>(`${this.baseUrl}project-budget`);
  }

  createProjectBudget(projectBudgetData: ProjectBudget): Observable<ProjectBudget> {
    return this.http.post<ProjectBudget>(`${this.baseUrl}project-budget`, projectBudgetData);
  }

  getProjectBudgetById(id: string): Observable<ProjectBudget> {
    return this.http.get<ProjectBudget>(`${this.baseUrl}project-budget/${id}`);
  }

  updateProjectBudget(id: string, projectBudgetData: ProjectBudget): Observable<ProjectBudget> {
    return this.http.put<ProjectBudget>(`${this.baseUrl}project-budget/${id}`, projectBudgetData);
  }

  deleteProjectBudget(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}project-budget/${id}`);
  }
}
