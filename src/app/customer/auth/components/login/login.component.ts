import { APIResponse, AuthenticationResponse } from "src/app/models/response/model";

import { Component, OnInit,} from "@angular/core";
import { Router } from "@angular/router";
import {ThemePalette} from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/customer/services/auth.services";
import { UserService } from "src/app/customer/services/user.service";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressBarService } from 'src/app/customer/services/progress-bar.service';
import { SignInRequest } from "src/app/models/request/model";
import { MessageDialogService } from "src/app/customer/services/message-dialog.service";
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { ForgetPasswordComponent } from "../forget-password/forget-password.component";

import { tap, timer } from 'rxjs';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  signInFG!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private matDialog: MatDialog,
    private _fb: FormBuilder,
    public progressBarService: ProgressBarService,
    private _authService: AuthService,
    private _userService: UserService,
    private _messageDialogService: MessageDialogService,
    private _router: Router,
    private _progressSpinnerService: ProgressSpinnerService
  ) {
    this._authService.loadGoogleClientLibs();
    this.signInFG = this._fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: ['', Validators.compose([Validators.required])],
    });
    (window as any).signInWithGoogleCallback =
      this.signInWithGoogleCallback.bind(this);
  }
  get usernameControl(): FormControl {
    return this.signInFG.get('username') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.signInFG.get('password') as FormControl;
  }

  onClickSignIn(formValue: SignInRequest) {
    this._authService
      .signIn(formValue)
      .pipe(
        tap((signInResponse) => {
          console.log(signInResponse);

          const { statusCode } = signInResponse;
          if (statusCode == 200) {
            const { data } =
              signInResponse as APIResponse<AuthenticationResponse>;
            signInResponse as APIResponse<AuthenticationResponse>;
            this._userService.nextUser(data.user);
            this._authService.nexAccessToken(data.accessToken);
            this._authService.storeRefreshToken(data.refreshToken);
            console.log(this._userService.userValue);

            this.dialogRef.close();
          } else if (statusCode == 400) {
            const { data } = signInResponse as APIResponse<string>;
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              {
                title: 'Không thể đăng nhập',
                message: data,
              }
            );
          } else {
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              {
                title: 'Không thể đăng nhập',
                message: 'Ứng dụng đã xảy ra lỗi',
              }
            );
          }
        })
      )
      .subscribe();
  }

  onClickForgetPassword() {
    let forgetPasswordDialog = this.matDialog.open(ForgetPasswordComponent, {
      // enterAnimationDuration: '500ms',
      // exitAnimationDuration: '500ms',
    });
    forgetPasswordDialog.afterClosed().subscribe((result) => {
      if (result.data === 201) {
        this.dialogRef.close();
      }
    });
  }

  signInWithGoogleCallback(response: any) {
    console.log(response)
    this._progressSpinnerService.next(true);
    this._authService.signInWithGoogleCallback(response);
    this._userService.user$.subscribe((user) => {
      if (user) {
        this.dialogRef.close();
      }
    });
  }

  navigateToSignUp(){
    this.dialogRef.close()
    this._router.navigate(['/auth/register'])
  }
}
