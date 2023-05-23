import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Cart, CartItem, ReservationRequest } from 'src/app/models/model';
import { getDateFromArray, getDateInString, getDateNoYearTitle, getNightNumber } from 'src/app/shared/utils/DateUtils';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { PaymentService } from '../services/payment.service';
import { parseISO } from 'date-fns';
import { HOTEL_IMG } from 'src/app/models/constance';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  headerComponent!: HTMLElement;

  showWaitingOverlay: boolean = false;
  chosenItems: CartItem[] = [];
  showAmenitiesItem: number[] = [];

  readonly BASE_IMG: string = HOTEL_IMG;

  customerInformationFormGroup = this._formBuilder.group({
    family_name: ['', Validators.compose([Validators.required])],
    surname: ['', Validators.compose([Validators.required])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    phone: ['', Validators.compose([Validators.required, Validators.pattern("^((\\+84?)|0|)?[0-9]{10}$"), Validators.maxLength(10), Validators.minLength(10)])],
  });

  constructor(private _formBuilder: FormBuilder, private paymentService: PaymentService) {
  }

  ngOnInit(): void {
    this.chosenItems = localStorage.getItem("chosenItems") ? JSON.parse(localStorage.getItem("chosenItems")!) : [];
    this.headerComponent = document.getElementsByClassName('header-container').item(0) as HTMLElement;
    this.headerComponent.style.display = "none";
  }

  ngOnDestroy(): void {
    this.headerComponent.style.display = "flex";
  }

  getRatingStar(rating: number) {
    return Math.round(rating / 2);
  }

  getDateInPlain(dateNum: number[]) {
    const parsedArray = getDateFromArray(dateNum);
    const parsed = parseISO(parsedArray).getTime()
    return getDateInString(parsed);
  }

  getNightLabel(startDate: number[], endDate: number[]) {
    const start = parseISO(getDateFromArray(startDate)).getTime()
    const end = parseISO(getDateFromArray(endDate)).getTime()
    return getNightNumber(start, end) + " đêm";
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
    const totalPrice = this.chosenItems.reduce((total, item) => {
      return total + (this.getNightInNumber(item.fromDate, item.toDate) * item.room.finalPrice);
    }
      , 0);
    return totalPrice;
  }

  getNightInNumber(startDate: number[], endDate: number[]) {
    const start = parseISO(getDateFromArray(startDate)).getTime()
    const end = parseISO(getDateFromArray(endDate)).getTime()
    return getNightNumber(start, end);
  }

  getPriceByNights(fromDate: number[], toDate: number[], price: number) {
    return getMoneyFormat(this.getNightInNumber(fromDate, toDate) * price);
  }

  onProceedToPayment() {
    if (this.customerInformationFormGroup.valid) {
      const finalItems: ReservationRequest[] = [];
      const fullName = this.customerInformationFormGroup.get('family_name')?.value + " " + this.customerInformationFormGroup.get('surname')?.value;
      const email = this.customerInformationFormGroup.get('email')?.value || "";
      const phone = this.customerInformationFormGroup.get('phone')?.value || "";
      this.chosenItems.forEach(item => {
        finalItems.push({
          price: item.room.rentalPrice,
          adult: item.adult,
          children: item.child,
          startDate: new Date(getDateFromArray(item.fromDate)).getTime().toString(),
          endDate: new Date(getDateFromArray(item.toDate)).getTime().toString(),
          discountPercent: 0,
          username: "",//if user is logged in pls put username here
          hotelId: item.hotel.id,
          roomId: item.room.id,
          fullName: fullName,
          email: email,
          phone: phone,
        });
      });

      localStorage.setItem("finalItems", JSON.stringify(finalItems));

      this.showWaitingOverlay = true;
      this.paymentService.createToken().subscribe(data => {
        if (data.access_token && data.token_type) {
          localStorage.setItem("payment_token", data.access_token);
          this.paymentService.createPayment(data.access_token, data.token_type, this.chosenItems).subscribe(data => {
            if (data.links) {
              localStorage.setItem("payment_id", data.id);
              window.location.href = data.links[1].href;
            }
          });
        }
      });
    }
  }
}
