import { Component, OnInit } from '@angular/core';
import { cart } from 'src/app/models/constance';
import { Cart } from 'src/app/models/model';
import { getDateInString } from 'src/app/shared/utils/DateUtils';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart = cart;

  chosenItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // this.cart.items = [];
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

    const itemInCart = this.cart.items.find(item => item.id === id);
    const itemChosen = this.chosenItems.find(item => item.id === id);
    if (checked && itemInCart && !itemChosen) {
      this.chosenItems.push(itemInCart);
    } else {
      this.chosenItems = this.chosenItems.filter(item => item.id !== id);
    }
  }

  getTotalPrice() {
    const totalPrice = this.chosenItems.reduce((total, item) => {
      return total + item.price;
    }
      , 0);
    return totalPrice;
  }

  getDateInPlain(dateNum: number) {
    return getDateInString(dateNum);
  }

  onDeleteItemFromCart(id: number) {
    this.chosenItems = this.chosenItems.filter(item => item.id !== id);
    this.cart.items = this.cart.items.filter(item => item.id !== id);
  }

  convertToString(value: number) {
    return String(value);
  }

  isChecked(id: number) {
    return this.chosenItems.find(item => item.id === id);
  }
}
