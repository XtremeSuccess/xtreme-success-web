import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log('.....')
      this.router.navigate(['']);
      return false
    }
    console.log('Can Activate')
    return true;
  }
}
