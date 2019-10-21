import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: String = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public uploadGrades(data: any[]) {
  	return this.httpClient.post(`${this.apiUrl}/grades`, { content: data });
  }

  public getStudents() {
    return this.httpClient.get(`${this.apiUrl}/students`);
  }
}
