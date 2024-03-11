import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndPoint } from '../apiendpoint';
import { Observable } from 'rxjs';
import { MeetingMinute } from '../models/meeting-minute';

@Injectable({
  providedIn: 'root'
})
export class MeetingMinuteService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = apiEndPoint();
  }

  getAllMeetingMinutes(): Observable<MeetingMinute[]> {
    return this.http.get<MeetingMinute[]>(`${this.baseUrl}meeting-minute`);
  }

  getMeetingMinuteById(id: string): Observable<MeetingMinute> {
    return this.http.get<MeetingMinute>(`${this.baseUrl}meeting-minute/${id}`);
  }

  createMeetingMinute(meetingMinuteData: MeetingMinute): Observable<MeetingMinute> {
    return this.http.post<MeetingMinute>(`${this.baseUrl}meeting-minute`, meetingMinuteData);
  }

  updateMeetingMinute(id: string, meetingMinuteData: MeetingMinute): Observable<MeetingMinute> {
    return this.http.put<MeetingMinute>(`${this.baseUrl}meeting-minute/${id}`, meetingMinuteData);
  }

  deleteMeetingMinute(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}meeting-minute/${id}`);
  }
}
