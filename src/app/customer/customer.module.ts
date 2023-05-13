import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { FilterBarModule } from '../shared/layout/customer-layout/filter-bar/filter-bar.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';


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
    FilterBarModule
  ]
})
export class CustomerModule { }
