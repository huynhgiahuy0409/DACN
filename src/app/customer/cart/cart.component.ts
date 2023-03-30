import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/model';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Cart = {
    items: [
      {
        id: 1,
        name: 'Product 1',
        price: 1000000,
        location: 'Location 1',
        image: 'https://pix8.agoda.net/hotelImages/2279980/-1/08635f845557c87d704ed9cf15c583d1.jpg?ca=7&ce=1&s=828x464&ar=16x9',
        avgRating: 10.0,
        reviews: 100,
        units: 1,
        special_feature: 'Special Feature 1',
        start_date: 1680102315647,
        end_date: 1680170095140
      },
      {
        id: 2,
        name: 'Product 2',
        price: 2000000,
        location: 'Location 2',
        image: 'https://pix8.agoda.net/hotelImages/2279980/-1/08635f845557c87d704ed9cf15c583d1.jpg?ca=7&ce=1&s=828x464&ar=16x9',
        avgRating: 9.5,
        reviews: 200,
        units: 2,
        special_feature: 'Special Feature 2',
        start_date: 1680102315647,
        end_date: 1680170095140
      },
    ]
  };

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

  getDateInString(dateNum: number) {
    const date = new Date(dateNum);
    return `${date.getDate()} tháng ${date.getMonth() + 1} năm ${date.getFullYear()}`;
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
