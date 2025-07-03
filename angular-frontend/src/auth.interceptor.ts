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
    const market = this.service.market?.name;
    const token = this.service.token;

    // Optional: Only intercept if MSAL has a user signed in
    // const account = this.msalService.instance.getActiveAccount();
    // if (!account) {
    //   return next.handle(req);
    // }

    // If we have a valid token, clone request with headers
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'x-market': market || ''
        }
      });
      return next.handle(cloned);
    }

    // If no token, send request unmodified
    return next.handle(req);
  }
}
