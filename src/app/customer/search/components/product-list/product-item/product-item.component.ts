import { SearchedProductItemResponse } from './../../../../../models/response';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input()
  searchedProduct!: SearchedProductItemResponse
  isHoverReviewItem = false
  constructor() { }

  ngOnInit(): void {
  }

}
