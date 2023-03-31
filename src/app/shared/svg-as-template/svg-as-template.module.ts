import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSvgComponent } from './cart-svg/cart-svg.component';
import { HotelHomeSvgComponent } from './hotel-home-svg/hotel-home-svg.component';
import { PrivateHomeSvgComponent } from './private-home-svg/private-home-svg.component';



@NgModule({
  declarations: [
    CartSvgComponent,
    HotelHomeSvgComponent,
    PrivateHomeSvgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CartSvgComponent,
    HotelHomeSvgComponent,
    PrivateHomeSvgComponent
   ]
})
export class SvgAsTemplateModule { }
