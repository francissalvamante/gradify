import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpParams} from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: String = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public uploadGrades(data: any[]) {
  	return this.httpClient.post(`${this.apiUrl}/grades`, { content: data });
  }

  public getStudents() {
    return this.httpClient.get(`${this.apiUrl}/students`);
  }

  public getStudentGrade(id: string) {
    const params = new HttpParams().set('studentId', id);
    return this.httpClient.get(`${this.apiUrl}/studentgrade`, { params: params });
  }

  public updateGrade(grade: number, studentId: string, currentTab: string, _id: string) {
    return this.httpClient.post(`${this.apiUrl}/update`, {
      _id: _id,
      grade: grade,
      studentId: studentId,
      type: currentTab
    });
  }
}
