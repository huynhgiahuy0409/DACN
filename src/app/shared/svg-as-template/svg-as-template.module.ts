import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSvgComponent } from './cart-svg/cart-svg.component';
import { HotelHomeSvgComponent } from './hotel-home-svg/hotel-home-svg.component';
import { PrivateHomeSvgComponent } from './private-home-svg/private-home-svg.component';
import { CheckSvgComponent } from './check-svg/check-svg.component';
import { WifiSvgComponent } from './wifi-svg/wifi-svg.component';
import { StarSvgComponent } from './star-svg/star-svg.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { DomesticSvgComponent } from './domestic-svg/domestic-svg.component';



@NgModule({
  declarations: [
    CartSvgComponent,
    HotelHomeSvgComponent,
    PrivateHomeSvgComponent,
    CheckSvgComponent,
    WifiSvgComponent,
    StarSvgComponent,
    CreditCardComponent,
    DomesticSvgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CartSvgComponent,
    HotelHomeSvgComponent,
    PrivateHomeSvgComponent,
    CheckSvgComponent,
    WifiSvgComponent,
    StarSvgComponent,
    CreditCardComponent,
    DomesticSvgComponent
  ]
})
export class SvgAsTemplateModule { }
