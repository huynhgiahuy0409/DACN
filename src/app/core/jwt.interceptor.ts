import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../customer/services/auth.service';
import { Router } from '@angular/router';
import { MessageDialogService } from '../customer/services/message-dialog.service';
import { ProgressSpinnerService } from '../customer/services/progress-spinner.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Injectable({
    providedIn: 'root',
  })
  export class JWTInterceptor implements HttpInterceptor {
    constructor(
      private authService: AuthService,
      private _messageDialogService: MessageDialogService,
      private _progressSpinnerService: ProgressSpinnerService,
      private _router: Router
    ) {}
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      let accessToken = this.authService.accessTokenVal;
      let reqTemp = req;
      if (accessToken) {
        let token = accessToken.token;
        reqTemp = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token),
        });
      }
      return next.handle(reqTemp).pipe(
        catchError((errorRes: HttpErrorResponse) => {
          let dialogRef;
          if (errorRes.error.message) {
            dialogRef = this._messageDialogService.openDangerDialog(
              MessageDialogComponent,
              errorRes.error.message
            );
          } else {
            dialogRef = this._messageDialogService.openDangerDialog(
              MessageDialogComponent,
              errorRes.error
            );
          }
          return throwError(() => errorRes);
        })
      );
    }
  }