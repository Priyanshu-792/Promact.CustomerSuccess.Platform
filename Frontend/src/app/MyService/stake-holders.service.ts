import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stakeholder } from '../models/stake-holders';
import { Observable } from 'rxjs';
import { apiEndPoint } from '../apiendpoint';

@Injectable({
  providedIn: 'root'
})
export class StakeHoldersService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllStakeholders(): Observable<Stakeholder[]> {
    return this.http.get<Stakeholder[]>(`${this.baseUrl}stake-holders`);
  }

  createStakeholder(stakeholderData: Stakeholder): Observable<Stakeholder> {
    return this.http.post<Stakeholder>(`${this.baseUrl}stake-holders`, stakeholderData);
  }

  getStakeholderById(id: string): Observable<Stakeholder> {
    return this.http.get<Stakeholder>(`${this.baseUrl}stake-holders/${id}`);
  }

  updateStakeholder(id: string, stakeholderData: Stakeholder): Observable<Stakeholder> {
    return this.http.put<Stakeholder>(`${this.baseUrl}stake-holders/${id}`, stakeholderData);
  }

  deleteStakeholder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}stake-holders/${id}`);
  }
}
