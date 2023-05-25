import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/customer/services/cart.service';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';
import { AddToCartRequest } from 'src/app/models/request';
import { RoomResponse } from 'src/app/models/response';
import { getDateInFormat } from 'src/app/shared/utils/DateUtils';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {
  @Input()
  room!: RoomResponse

  start_date !: string;
  end_date !: string;
  adult!: number;
  children!: number;
  room_id!: number;

  constructor(private _productFilterService: FilterProductService, private cartService: CartService, private toastrService: ToastrService) {
    this.start_date = getDateInFormat(this._productFilterService.startDateControl.value);
    this.end_date = getDateInFormat(this._productFilterService.endDateControl.value);
    this.adult = this._productFilterService.adultControl.value;
    this.children = this._productFilterService.childrenControl.value;
  }

  ngOnInit(): void {
    this.room_id = this.room.id
  }

  onAddToCart() {
    const request: AddToCartRequest = {
      adult: this.adult,
      child: this.children,
      fromDate: this.start_date,
      toDate: this.end_date,
      roomId: this.room_id,
      sessionId: localStorage.getItem("sessionId")
    };

    this.cartService.addItemToCart(request).subscribe({
      next: (response) => {
        if (localStorage.getItem("sessionId") === null) {
          localStorage.setItem("sessionId", response.sessionId);
        }
        this.toastrService.success("Thêm phòng vào giỏ hàng thành công", "Thành công !");
      },
      error: (error) => {
        this.toastrService.error(error.error, "Thất bại !");
      }
    })
  }
}
