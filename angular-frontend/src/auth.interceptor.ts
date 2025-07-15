import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { ServiceService } from './services/service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private service: ServiceService,
    private msalService: MsalService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const market = localStorage.getItem('market');
    const marketName = market;
    const token = localStorage.getItem('token');

    // If we have a valid token, clone request with headers
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'x-market': marketName || ''
        }
      });
      return next.handle(cloned);
    }

    // If no token, send request unmodified
    return next.handle(req);
  }
}
