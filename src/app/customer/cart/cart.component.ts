import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/model';
import { getDateFromArray, getDateInString, getNightNumber } from 'src/app/shared/utils/DateUtils';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { CartService } from '../services/cart.service';
import { parseISO } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { HOTEL_IMG } from 'src/app/models/constance';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: CartItem[] = [];
  session_id: string = localStorage.getItem("sessionId") || "";

  chosenItems: any[] = [];
  readonly BASE_IMG: string = HOTEL_IMG;

  constructor(private cartService: CartService, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.cartService.getCartItemsBySessionId(this.session_id).subscribe((res) => {
      this.cart = res;
    });
  }

  formatMoney(amount: number) {
    return getMoneyFormat(amount);
  }

  getRatingStar(rating: number) {
    return Math.round(rating / 2);
  }

  onChangeOption($event: any) {
    const { checked, source } = $event;
    const id = Number(source.id);

    const itemInCart = this.cart.find(item => item.id === id);
    const itemChosen = this.chosenItems.find(item => item.id === id);

    if (checked && itemInCart && !itemChosen) {
      this.chosenItems.push(itemInCart);
    } else {
      this.chosenItems = this.chosenItems.filter(item => item.id !== id);
    }
  }

  getTotalPrice() {
    const totalPrice = this.chosenItems.reduce((total, item) => {
      return total + (this.getNightInNumber(item.fromDate, item.toDate) * item.room.finalPrice);
    }
      , 0);
    return totalPrice;
  }

  getDateInPlain(dateNum: number[]) {
    const parsedArray = getDateFromArray(dateNum);
    const parsed = parseISO(parsedArray).getTime()
    return getDateInString(parsed);
  }

  getNightInNumber(startDate: number[], endDate: number[]) {
    const start = parseISO(getDateFromArray(startDate)).getTime()
    const end = parseISO(getDateFromArray(endDate)).getTime()
    return getNightNumber(start, end);
  }

  getPriceByNights(fromDate: number[], toDate: number[], price: number) {
    return this.formatMoney(this.getNightInNumber(fromDate, toDate) * price);
  }

  onDeleteItemFromCart(id: number) {
    this.chosenItems = this.chosenItems.filter(item => item.id !== id);
    this.cart = this.cart.filter(item => item.id !== id);

    this.cartService.deleteItemFromCart(id).subscribe(
      (res) => {
        if (res.statusCode === 200) {
          this.toastrService.success(res.message);
        }
      },
      (error) => {
        this.toastrService.error(error.error.message);
      });
  }

  convertToString(value: number) {
    return String(value);
  }

  onSaveChosenItems() {
    localStorage.setItem("chosenItems", JSON.stringify(this.chosenItems));
  }

  isChecked(id: number) {
    return this.chosenItems.find(item => item.id === id);
  }

  isAvailable(status: string) {
    return status === "AVAILABLE";
  }

  getDateFromArray(arr: number[]) {
    return String(getDateFromArray(arr));
  }
}
