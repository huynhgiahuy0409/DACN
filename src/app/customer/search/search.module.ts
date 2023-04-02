import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { FilterBarModule } from 'src/app/shared/layout/customer-layout/filter-bar/filter-bar.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SideBarFilterComponent } from './components/side-bar-filter/side-bar-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';


@NgModule({
  declarations: [
    SearchComponent,
    SideBarFilterComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FilterBarModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormModule
  ]
})
export class SearchModule { }
