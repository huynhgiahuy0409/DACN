import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cart } from 'src/app/models/constance';
import { Cart } from 'src/app/models/model';
import { getDateNoYearTitle, getNightNumber } from 'src/app/shared/utils/DateUtils';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  headerComponent!: HTMLElement;

  showWaitingOverlay: boolean = false;
  cart: Cart = cart;
  showAmenitiesItem: number[] = [];

  customerInformationFormGroup = this._formBuilder.group({
    family_name: ['', Validators.compose([Validators.required])],
    surname: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone: ['', Validators.compose([Validators.required, Validators.pattern("^((\\+84?)|0|)?[0-9]{10}$"), Validators.maxLength(10), Validators.minLength(10)])],
  });

  constructor(private _formBuilder: FormBuilder, private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.headerComponent = document.getElementsByClassName('header-container').item(0) as HTMLElement;
    this.headerComponent.style.display = "none";
  }

  ngOnDestroy(): void {
    this.headerComponent.style.display = "flex";
  }

  getRatingStar(rating: number) {
    return Math.round(rating / 2);
  }

  getDateInPlain(date: number) {
    return getDateNoYearTitle(date);
  }

  getNightInNumber(startDate: number, endDate: number) {
    return getNightNumber(startDate, endDate) + " đêm";
  }

  toggleShowAmenitiesItem(index: number) {
    if (this.showAmenitiesItem.includes(index)) {
      this.showAmenitiesItem = this.showAmenitiesItem.filter(item => item != index);
    } else {
      this.showAmenitiesItem.push(index);
    }
  }

  isShowAmenitiesItem(index: number) {
    return this.showAmenitiesItem.includes(index);
  }

  formatPrice(price: number) {
    return getMoneyFormat(price);
  }

  getTotalPrice() {
    const totalPrice = this.cart.items.reduce((total, item) => {
      return total + item.price;
    }
      , 0);
    return totalPrice + (totalPrice * 10 / 100);
  }

  onProceedToPayment() {
    if (this.customerInformationFormGroup.valid) {
      this.showWaitingOverlay = true;
      this.paymentService.createToken().subscribe(data => {
        if (data.access_token && data.token_type) {
          localStorage.setItem("payment_token", data.access_token);
          this.paymentService.createPayment(data.access_token, data.token_type, this.cart).subscribe(data => {
            if (data.links) {
              localStorage.setItem("payment_id", data.id);
              window.location.href = data.links[1].href;
            }
          });
        }
      });
    }
  }

  // getPaymentStatus()
}
