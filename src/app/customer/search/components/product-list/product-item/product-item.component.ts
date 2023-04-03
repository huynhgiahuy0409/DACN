import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product-list.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input()
  product!: Product
  isHoverReviewItem = false
  constructor() { }

  ngOnInit(): void {
  }

}
