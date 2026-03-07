import { HttpEvent, HttpHandler, HttpHandlerFn, HttpRequest, HttpResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";



export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> { 
   const authService = inject(AuthService);
   const token = authService.accessToken();
   if (token) {
    request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
   }
   return next(request);
}