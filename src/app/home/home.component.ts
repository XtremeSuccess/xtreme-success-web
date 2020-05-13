import { Router } from '@angular/router';
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
    private readonly authService: AuthService,
    private readonly router: Router
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

  logout() {
    localStorage.clear();
    this.isAuthenticated = this.authService.isAuthenticated();
    this.router.navigate(['/home/index']);
  }

}
