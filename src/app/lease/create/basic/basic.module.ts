import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic.component';
import {FormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [
    BasicComponent
  ],
  imports: [
    CommonModule,
    BasicRoutingModule,
    FormsModule,
    MatIconModule
  ]
})
export class BasicModule { }
