import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { DemoComponent } from './demo/demo.component';
import { FilterBarModule } from '../shared/layout/customer-layout/filter-bar/filter-bar.module';


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
    FilterBarModule
  ]
})
export class CustomerModule { }
