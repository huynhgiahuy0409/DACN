import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { FilterBarModule } from 'src/app/shared/layout/customer-layout/filter-bar/filter-bar.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FilterBarModule,
    AngularMaterialModule
  ]
})
export class SearchModule { }
