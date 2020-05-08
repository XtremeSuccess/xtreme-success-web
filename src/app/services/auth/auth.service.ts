import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = "http://localhost:1337"
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(
    private readonly http: HttpClient,
  ) { }

  login(username: string, password: string) {
    return this.http.post(`${this.url}/auth/local`, {
      identifier: username,
      password: password
    });
  }

  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
