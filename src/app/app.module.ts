import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
<<<<<<< HEAD
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
=======
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatDialogModule } from '@angular/material/dialog';
>>>>>>> tuan

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
<<<<<<< HEAD
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularMaterialModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
=======
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
>>>>>>> tuan
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

