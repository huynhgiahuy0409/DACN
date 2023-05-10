import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of, switchMap, tap, timeout } from 'rxjs';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { ProductFilterRequest } from 'src/app/models/request';
import {
  AddressResponse,
  AverageRatingResponse,
  DiscountResponse,
  SearchedProductItemResponse,
  SearchedProductResponse,
} from 'src/app/models/response';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  searchedProductResponse$!: Observable<SearchedProductResponse | null>;
  constructor(
    private _route: ActivatedRoute,
    private _productFilterService: FilterProductService,
    private _progressSpinnerService: ProgressSpinnerService
  ) { }

  ngOnInit(): void {
    this.searchedProductResponse$ = this._route.queryParamMap
      .pipe(
        switchMap((paramsAsMap: any) => {
          this._progressSpinnerService.next(true);
          const {
            textToSearch,
            checkIn,
            checkOut,
            rooms,
            adults,
            children,
            value,
            type,
            property,
            direction,
          } = paramsAsMap.params;
          const productFilterRequest: ProductFilterRequest = {
            search: textToSearch,
            startDate: checkIn,
            endDate: checkOut,
            rooms: rooms,
            adults: adults,
            children: children,
            value: value,
            type: type,
          };
          productFilterRequest.productSortRequest =
          property && direction
              ? {
                property: property,
                direction: direction,
              }
              : undefined;
          console.log(productFilterRequest);
          return this._productFilterService.filterProduct(productFilterRequest).pipe(map((response) => response.data));
        }),
        tap(response => {
          console.log(response);
          this._progressSpinnerService.next(false);
        })
      )

  }


}
