// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Handle successful login, e.g., navigate to another page
        console.log('Login successful:', response);
        this.authService.setSession(response.token, response.user);
        swal.fire('Success!', response.message, 'success');
        // show the waring message 20 second  before the token expire
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Handle login error, display an error message, etc.
        console.error(error);
        swal.fire('Error!', error.error.error, 'error');
      }
    );
  }
  checkTimeOut() {}
}
