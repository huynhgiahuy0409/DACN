import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { FilterBarModule } from '../shared/layout/customer-layout/filter-bar/filter-bar.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
<<<<<<< HEAD
import { ProductDetailModule } from './product-detail/product-detail.module';
=======
import { DemoComponent } from './demo/demo.component';
import { FilterBarModule } from '../shared/layout/customer-layout/filter-bar/filter-bar.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
>>>>>>> tuan


@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    CustomerLayoutModule,
    AngularMaterialModule,
    RouterModule,
<<<<<<< HEAD
    FilterBarModule,
    ProductDetailModule
=======
    HttpClientModule,
    ReactiveFormsModule,
    AuthModule,
    FormsModule,
    FilterBarModule
>>>>>>> tuan
  ]
})
export class CustomerModule { }
