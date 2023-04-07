import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./register.component";
import { AngularMaterialModule } from "src/app/shared/angular-material/angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule
  ]
})
export class RegisterModule { }
