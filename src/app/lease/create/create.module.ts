import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from "@angular/material/list";



@NgModule({
  declarations: [
    CreateComponent
  ],
  exports: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    CreateRoutingModule,
    MatSidenavModule,
    MatListModule,


  ]
})
export class CreateModule { }
