import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Data {
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  url: string = 'http://localhost:1337'
  constructor(private http: HttpClient) { }

  getSubjectDetail(id: number) {
    return this.http.get(`${this.url}/subjects/${id}`);
  }

  getSingleChapter(id: number) {
    return this.http.get(`${this.url}/chapters/${id}`);
  }
}
