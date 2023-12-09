// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../APP_CONSTANTS';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserLoggedIn: boolean = false;
  userProfile : any;
  loginSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isUserLoggedIn);
  constructor(private http: HttpClient) {
    this.isUserLoggedIn = !!localStorage.getItem('token');
    this.loginSubject.next(this.isUserLoggedIn);

  }


  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${Constants.API_URL}/auth/login`, loginData);
  }

  signup(email:string,password:string, firstName:string,lastName:string): Observable<any> {
    const signupData = {email,password,firstName,lastName };
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
  }
  setSession(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.isUserLoggedIn = true;
    this.loginSubject.next(this.isUserLoggedIn);
  }

  getProfile(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
  generateAccessToken() {
    const token = localStorage.getItem('token');
    return this.http.post(`${Constants.API_URL}/auth/refresh-token`, { token });
  }
}
