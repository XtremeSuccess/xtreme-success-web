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
  url: string;
  constructor(
    private readonly userService: UserService
  ) {
    this.url = url;
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getUser(this.user.id).subscribe((data: User) => {
      this.user = data;
      console.log(data);
      this.user.created_at = new Date(data.created_at).toLocaleDateString();
    });
  }

}
