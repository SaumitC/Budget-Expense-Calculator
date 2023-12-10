// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../APP_CONSTANTS';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn: boolean = false;
  userProfile: any;
  loginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isUserLoggedIn
  );
  intervalId: any;
  constructor(private http: HttpClient, private router: Router) {
    this.isUserLoggedIn = !!localStorage.getItem('token');
    this.loginSubject.next(this.isUserLoggedIn);
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${Constants.API_URL}/auth/login`, loginData);
  }

  signup(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    const signupData = { email, password, firstName, lastName };
    return this.http.post(`${Constants.API_URL}/auth/signup`, signupData);
  }

  logout(): Observable<any> {
    return this.http.post(`${Constants.API_URL}/auth/logout`, {});
  }
  checkUserSession(): Observable<any> {
    return this.loginSubject.asObservable();
  }
  removeSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isUserLoggedIn = false;
    this.loginSubject.next(this.isUserLoggedIn);
    if (this.intervalId) clearInterval(this.intervalId);
  }
  setSession(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.isUserLoggedIn = true;
    this.loginSubject.next(this.isUserLoggedIn);
    this.startSessionTimeout();
  }
  startSessionTimeout() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      swal
        .fire({
          title: 'Warning!',
          text: 'Your session will expire in 20 seconds',
          confirmButtonText: 'Refresh session',
          cancelButtonText: 'Close',
          showCancelButton: true,
          timer: 20000,
        })
        .then((result: any) => {
          if (result.isConfirmed) {
            this.generateAccessToken().subscribe(
              (response: any) => {
                this.setSession(response.token, response.user);
                swal.fire('Success!', response.message, 'success');
              },
              (error: any) => {
                swal.fire('Error!', error.error.message, 'error');
              }
            );
          } else if (result.isDismissed) {
            clearInterval(this.intervalId);
          }
        });
    }, 1000 * 40);
  }

  getProfile(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  generateAccessToken() {
    const token = localStorage.getItem('token');
    return this.http.post(`${Constants.API_URL}/auth/refresh-token`, { token });
  }
}
