import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSvgComponent } from './cart-svg/cart-svg.component';
import { HotelHomeSvgComponent } from './hotel-home-svg/hotel-home-svg.component';
import { PrivateHomeSvgComponent } from './private-home-svg/private-home-svg.component';
import { CheckSvgComponent } from './check-svg/check-svg.component';
import { WifiSvgComponent } from './wifi-svg/wifi-svg.component';



@NgModule({
  declarations: [
    CartSvgComponent,
    HotelHomeSvgComponent,
    PrivateHomeSvgComponent,
    CheckSvgComponent,
    WifiSvgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CartSvgComponent,
    HotelHomeSvgComponent,
    PrivateHomeSvgComponent,
    CheckSvgComponent,
    WifiSvgComponent
  ]
})
export class SvgAsTemplateModule { }
