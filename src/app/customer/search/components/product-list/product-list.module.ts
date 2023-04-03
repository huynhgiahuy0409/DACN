import { SvgAsTemplateModule } from 'src/app/shared/svg-as-template/svg-as-template.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    SvgAsTemplateModule
  ],
  exports: [
    ProductListComponent,
    ProductItemComponent
  ]
})
export class ProductListModule { }
