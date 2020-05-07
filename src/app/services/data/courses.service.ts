import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  url: string = 'http://localhost:1337'
  constructor(private http: HttpClient) { }

  getAllCourses() {
    return this.http.get(`${this.url}/courses`);
  }
}
