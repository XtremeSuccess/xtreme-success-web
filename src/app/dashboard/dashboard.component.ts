import { AuthService } from './../services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './../services/data/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/auth/auth';
import { url } from 'src/server-config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  loggedInUser: any;
  url: string;
  constructor(
    private readonly userService: UserService,
    private readonly jwtHelper: JwtHelperService,
    private readonly authService: AuthService
  ) {
    this.url = url;
  }

  ngOnInit(): void {
    this.loggedInUser = this.jwtHelper.decodeToken(this.authService.getToken());

    this.userService.getUser(this.loggedInUser.id).subscribe((data: User) => {
      this.user = data;
      console.log(data);
      this.user.created_at = new Date(data.created_at).toLocaleDateString();
    });
  }

}
