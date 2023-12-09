import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  currentUser: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
   this.authService.loginSubject.subscribe((data) => {
      this.isLogged = data;
      this.currentUser = this.authService.getProfile();
      console.log(this.currentUser);
    } );
  }

  isLoggedIn() {
    this.currentUser = this.authService.getProfile();
    if (this.currentUser) {
      this.isLogged = true;
    }
    return this.isLogged;
  }
  logout() {
    this.authService.logout().subscribe(
      (response: any) => {
        this.isLogged = false;
        this.authService.removeSession();

        swal.fire('Success!', response.message, 'success');
        this.router.navigate(['/login']);
      },
      (error) => {}
    );
  }
}
