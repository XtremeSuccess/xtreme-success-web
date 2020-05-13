import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auth } from 'src/app/models/auth/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  form: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private formBuilder: FormBuilder,
    private jwtHelper: JwtHelperService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  login() {
    this.authService.login(this.email, this.password)
      .subscribe((auth: Auth) => {
        localStorage.setItem('access_token', auth.jwt);
        this.router.navigate(['/dashboard']);
      }, (error) => {
        console.log(error);
      });
  }

}
