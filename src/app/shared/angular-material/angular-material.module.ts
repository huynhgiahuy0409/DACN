import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class AngularMaterialModule { }
