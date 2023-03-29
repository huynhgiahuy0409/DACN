import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSvgComponent } from './cart-svg/cart-svg.component';



@NgModule({
  declarations: [
    CartSvgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
     CartSvgComponent
   ]
})
export class SvgAsTemplateModule { }
