import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { Observable, filter, map, of, switchMap, tap, timeout } from 'rxjs';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { OptionFilterRequest, ProductFilterRequest } from 'src/app/models/request';
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
    this._route.queryParamMap
      .pipe(
        tap((paramsAsMap: any) => {
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
            hotelFacilities,
            benefits,
            guestRating,
            discount,
            priceFrom,
            priceTo,
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
            productSort: {
              property: property,
              direction: direction,
            },
            optionFilter: {
              priceFrom: priceFrom,
              priceTo: priceTo,
              discount: discount,
              guestRating: guestRating,
              benefits: benefits? benefits.split(",").map(Number): undefined,
              hotelFacilities: hotelFacilities? hotelFacilities.split(",").map(Number): undefined
            }
          };
          console.log(productFilterRequest)
          this._productFilterService.nextProductFilterRequest(
            productFilterRequest
          );
        })
      )
      .subscribe();
    /* Detect filter from URL to fetch SeachedProducts */
    this.searchedProductResponse$ =
      this._productFilterService.productFilterRequest$.pipe(
        switchMap((filter) => {
          if (filter) {
            console.log(filter)
            return this._productFilterService
              .filterProduct(filter)
              .pipe(map((response) => response.data));
          } else {
            return of(null);
          }
        }),
        tap((searchedProductResponse) => {
          console.log(searchedProductResponse)
          this._progressSpinnerService.next(false);
          this._productFilterService.nextSearchedProductResponse(
            searchedProductResponse
          );
        })
      );
  }
}
