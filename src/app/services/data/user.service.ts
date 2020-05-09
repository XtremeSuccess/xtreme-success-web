import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'src/server-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient
  ) { }

  getMyself() {
    return this.http.get(`${url}/users/me`);
  }

  getUser(id: number) {
    return this.http.get(`${url}/users/${id}`);
  }
}
