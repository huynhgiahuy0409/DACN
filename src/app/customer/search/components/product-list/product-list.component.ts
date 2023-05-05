import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of, switchMap, tap, timeout } from 'rxjs';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { ProductFilterRequest } from 'src/app/models/request';
import { AddressResponse, AverageRatingResponse, DiscountResponse, SearchedProductItemResponse } from 'src/app/models/response';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  searchedProducts$!: Observable<SearchedProductItemResponse[]>;
  constructor(private _route: ActivatedRoute, private _productFilterService: FilterProductService, private _progressSpinnerService: ProgressSpinnerService) { }

  ngOnInit(): void {
    this._progressSpinnerService.next(true)
    this._route.queryParamMap.pipe(
      tap((paramsAsMap: any) => {
        const { textToSearch, checkIn, checkOut, rooms, adults, children, hotel } = paramsAsMap.params
        const productFilterRequest: ProductFilterRequest = {
          search: textToSearch,
          startDate: checkIn,
          endDate: checkOut,
          rooms: rooms,
          adults: adults,
          children: children,
          hotelId: hotel,
        }
        this._productFilterService.nextProductFilterRequest(productFilterRequest)
      }),
    ).subscribe(
      response => {
        this._progressSpinnerService.next(false)
      }
    )

    this.searchedProducts$ = this._productFilterService.productFilterRequest$.pipe(
      tap(_ => {
        this._progressSpinnerService.next(true)
      }),
      switchMap(filter => {
        if (filter) {
          return this._productFilterService.filterProduct(filter).pipe(map(response => { return response.data }))
        } else {
          return of([])
        }
      }),
      tap(value => {
        this._progressSpinnerService.next(false)
      })
    )
  }
}
