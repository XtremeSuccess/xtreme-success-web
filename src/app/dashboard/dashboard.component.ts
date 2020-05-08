import { UserService } from './../services/data/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/auth/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getMyself().subscribe(
      (data: User) => { this.user = data },
      error => console.log(error)
    )
  }

}
