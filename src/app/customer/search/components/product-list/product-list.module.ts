import { SvgAsTemplateModule } from 'src/app/shared/svg-as-template/svg-as-template.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { CustomerRoutingModule } from 'src/app/customer/customer-routing.module';
import { LiveshowImageDialogComponent } from './product-item/dialog/liveshow-image-dialog/liveshow-image-dialog.component';
import { LsImageItemComponent } from './product-item/dialog/liveshow-image-dialog/ls-image-item/ls-image-item.component';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductItemComponent,
    LiveshowImageDialogComponent,
    LsImageItemComponent
  ],
  imports: [
    CommonModule,
    SvgAsTemplateModule,
    AngularMaterialModule,
    CustomerRoutingModule,
    RouterModule
  ],
  exports: [
    ProductListComponent,
    ProductItemComponent,
  ]
})
export class ProductListModule { }
