import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { SvgAsTemplateModule } from 'src/app/shared/svg-as-template/svg-as-template.module';


@NgModule({
  declarations: [
    HomeComponent,
    HomeBannerComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    SvgAsTemplateModule
  ]
})
export class HomeModule { }
