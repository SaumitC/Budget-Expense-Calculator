import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router:Router ,private authService : AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // You can modify the request here, for example, add headers or tokens
    const modifiedReq = req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
    });

    // Pass the modified request to the next interceptor or the backend
    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized: navigate to login page
          this.authService.removeSession();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );;
  }
}
