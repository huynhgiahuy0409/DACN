import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/customer/services/user.service';
import { AuthService } from 'src/app/customer/services/auth.services';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/customer/auth/components/login/login.component';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/models/model';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss'],
})
export class CustomerHeaderComponent implements OnInit {
  user$!: Observable<UserDTO | null>
  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    private _authService: AuthService,
    private _router: Router
  ) { }
  openLoginFormDialog(
  ): void {
    this.dialog.open(LoginComponent);
  }
  ngOnInit(): void {
    this.user$ = this.userService.user$
    this.user$.subscribe(v => console.log(v))
  }
  logout(){
    localStorage.removeItem('token');
    window.location.href = '/home';
  }
}
