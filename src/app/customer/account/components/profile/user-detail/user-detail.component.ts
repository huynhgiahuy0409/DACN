import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/customer/auth/components/login/login.component';
import { UserService } from 'src/app/customer/services/user.service';
import { UserDTO } from 'src/app/models/model';
type FieldType = 'fullName' | 'phone' | 'gender' | 'password' | 'dob';
export function matchPassword(): ValidatorFn {
  return (control: AbstractControl) => {
    const password = control.get('newPassword1st') as FormControl;
    const confirmPassword = control.get('newPassword2nd') as FormControl;
    if (password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null
  };
}
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user$!: Observable<UserDTO | null>;
  modifyState = {
    fullName: false,
    email: false,
    gender: false,
    dob: false,
    phone: false,
    password: false,
  };
  userFG!: FormGroup;
  constructor(private _fb: FormBuilder, private _userSerivce: UserService) {
    this.user$ = _userSerivce.user$;
    let currUser = _userSerivce.userValue;
    const { fullName, phone, email, gender, dob } = currUser;
    this.userFG = this._fb.group({
      fullName: [fullName, Validators.required],
      phone: [phone, Validators.required],
      email: [email, Validators.required],
      gender: [gender, Validators.required],
      dob: [dob, Validators.required],
      passwordChangeFG: this._fb.group(
        {
          curPassword: ['', Validators.required],
          newPassword1st: ['', Validators.required],
          newPassword2nd: ['', Validators.required],
        },
        {
          validators: [Validators.required, matchPassword]
        }
      )
    });
  }
  ngOnInit(): void {
    this.user$.subscribe((user) => {
      console.log(user);
    });
  }
  get passwordChangeFG(): FormGroup{
    return this.userFG.get('passwordChangeFG') as FormGroup
  }
  updateUser(field: FieldType) {
    let userValue = this.userFG.value;
    let currUser = this._userSerivce.userValue;
    currUser = { ...currUser, ...userValue };
    this._userSerivce.nextUser(currUser);
    this.modifyState[field] = false;
  }
  editUser(field: FieldType) {
    let currUser = this._userSerivce.userValue;
    const { fullName, phone, email, gender, dob } = currUser;
    this.userFG.patchValue({
      fullName,
      phone,
      email,
      gender,
      dob,
    });
    this.modifyState[field] = true;
  }

}
