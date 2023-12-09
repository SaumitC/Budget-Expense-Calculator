import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService : AuthService, private Router : Router ) { }

  canActivate(): boolean {
    if(!this.authService.isUserLoggedIn){
      this.Router.navigate(['/login']);
      return false;
    }
    return this.authService.isUserLoggedIn;
  }
}
