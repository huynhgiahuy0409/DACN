import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { SvgAsTemplateModule } from '../../svg-as-template/svg-as-template.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CustomerHeaderComponent, CustomerFooterComponent],
  imports: [CommonModule, AngularMaterialModule, SvgAsTemplateModule, RouterModule],
  exports: [CustomerHeaderComponent, CustomerFooterComponent],
})
export class CustomerLayoutModule { }
