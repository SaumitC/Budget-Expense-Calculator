// signup.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import swal from "sweetalert2"
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private authService: AuthService ,private router: Router) {}

  signup() {
    this.authService.signup(this.email, this.password, this.firstName, this.lastName)
      .subscribe((response:any) => {
        // Handle successful signup, e.g., navigate to another page
        swal.fire("Success!", response.message , "success");
        this.router.navigate(['/login']);
      }, (error) => {
        // Handle signup error, display an error message, etc.
        swal.fire("Error!", error.error.message , "error");
      });
  }
}
