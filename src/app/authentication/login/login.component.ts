import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Auth } from 'src/app/models/auth/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe((auth: Auth) => {
      console.log(auth.jwt);
    }, (error) => {
      console.log(error)
    });
  }

}
