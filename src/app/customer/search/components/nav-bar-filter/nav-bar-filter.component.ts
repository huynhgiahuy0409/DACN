import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';
import { ProductFilterRequest } from 'src/app/models/request';

@Component({
  selector: 'app-nav-bar-filter',
  templateUrl: './nav-bar-filter.component.html',
  styleUrls: ['./nav-bar-filter.component.scss']
})
export class NavBarFilterComponent implements OnInit {
  tabs: string[] = [
    "Phù hợp nhất",
    "Được đánh giá nhiều nhất",
    "Giá thấp nhất trước",
    "Tên sản phẩm"
  ];
  sltTabIdx = 0
  constructor(private _productFilterService: FilterProductService) { }

  ngOnInit(): void {
  }
  selectTabIdx(index: number){
    this.sltTabIdx = index
    let currProductFilterRequest: ProductFilterRequest | null = this._productFilterService.currProductFilterRequest
    if(currProductFilterRequest){
      if(index === 0){
        currProductFilterRequest.productSortRequest = undefined
      }else if(index === 1){
        
      }else if(index === 2){
        currProductFilterRequest.productSortRequest = {
          direction: "asc",
          property: "price"
        }
      }else if(index === 3){
        currProductFilterRequest.productSortRequest = {
          direction: "asc",
          property: "product-name"
        }
      }
      this._productFilterService.nextProductFilterRequest(currProductFilterRequest)
    }
  }
}
