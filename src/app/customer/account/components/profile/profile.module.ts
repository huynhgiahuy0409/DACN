import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UserDetailComponent,
    PaymentMethodComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
