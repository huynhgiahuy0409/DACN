import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatIconModule,
    MatSelectModule
  ]
})
export class AngularMaterialModule { }
