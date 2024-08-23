import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const message = inject(ToastService);

  const token = localStorage.getItem('token');
  if (token) {
    console.log('Adding token to request:', req.url);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        if (req.url.endsWith('/auth/login')) {
          message.add({
            severity: 'error',
            summary: 'Login failed',
            detail: err.error.message,
          });
          return throwError(err);
        }

        authService.logout();
        message.add({
          severity: 'error',
          summary: 'Session expired',
          detail: 'Please log in again',
        });
      }
      return throwError(err);
    })
  );
};