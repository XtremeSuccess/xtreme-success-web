import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:1337"

  constructor(
    private readonly http: HttpClient
  ) { }

  getMyself() {
    return this.http.get(`${this.url}/users/me`);
  }
}
