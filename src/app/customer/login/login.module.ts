import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { AngularMaterialModule } from "src/app/shared/angular-material/angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule
  ]
})
export class LoginModule { }
