import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resource } from '../models/resources';
import { apiEndPoint } from '../apiendpoint';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {
  
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrl}project-resources`);
  }

  createResource(resourceData: Resource): Observable<Resource> {
    return this.http.post<Resource>(`${this.baseUrl}project-resources`, resourceData);
  }

  getResourceById(id: string): Observable<Resource> {
    return this.http.get<Resource>(`${this.baseUrl}project-resources/${id}`);
  }

  updateResource(id: string, resourceData: Resource): Observable<Resource> {
    return this.http.put<Resource>(`${this.baseUrl}project-resources/${id}`, resourceData);
  }

  deleteResource(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}project-resources/${id}`);
  }
}
