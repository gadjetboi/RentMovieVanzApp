import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
 
      .pipe(
 
        retry(1),
 
        catchError((error: HttpErrorResponse) => {
 
          let errorMessage = '';
 
          if (error.error instanceof ErrorEvent) {
 
            // client-side error
 
            errorMessage = "Error: " + error.error.message;
 
          } else {
 
            // server-side error
 
            errorMessage = "Error Code: " + error.status + "\nMessage:" + error.message;
 
          }
 
          this.toastr.error(errorMessage, "Error");
 
          return throwError(errorMessage);
 
        })
 
      )
 
  }
}
