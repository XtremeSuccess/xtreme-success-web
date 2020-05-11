import { AuthService } from './../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  expandedMenu: boolean = false;
  isAuthenticated: boolean;
  constructor(
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  expandMenu() {
    if (this.expandedMenu) {
      this.expandedMenu = false;
    } else {
      this.expandedMenu = true;
    }
  }

}
