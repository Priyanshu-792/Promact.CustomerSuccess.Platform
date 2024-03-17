import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../apiendpoint';
import { Observable } from 'rxjs';
import { DetailedTimeline } from '../models/detailed-timeline';

@Injectable({
  providedIn: 'root'
})
export class DetailedTimelineService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint(); 
  }

  getAllTimelines(): Observable<DetailedTimeline[]> {
    return this.http.get<DetailedTimeline[]>(`${this.baseUrl}detailed-timeline`);
  }

  createTimeline(timelineData: DetailedTimeline): Observable<DetailedTimeline> {
    return this.http.post<DetailedTimeline>(`${this.baseUrl}detailed-timeline`, timelineData);
  }

  getTimelineById(id: string): Observable<DetailedTimeline> {
    return this.http.get<DetailedTimeline>(`${this.baseUrl}detailed-timeline/${id}`);
  }

  updateTimeline(id: string, timelineData: DetailedTimeline): Observable<DetailedTimeline> {
    return this.http.put<DetailedTimeline>(`${this.baseUrl}detailed-timeline/${id}`, timelineData);
  }

  deleteTimeline(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}detailed-timeline/${id}`);
  }
}
