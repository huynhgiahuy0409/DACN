import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { DemoComponent } from './demo/demo.component';


@NgModule({
  declarations: [
    CustomerComponent,
    DemoComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomerLayoutModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class CustomerModule { }
