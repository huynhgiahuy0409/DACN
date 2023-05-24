import { URL_API } from 'src/app/models/constance';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ProductFilterRequest } from 'src/app/models/request';
import { FilterProductService } from '../services/filter-product.service';
import { ProgressSpinnerService } from '../services/progress-spinner.service';
import { HotelResponse, ProductDetailResponse } from 'src/app/models/response';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productDetail$!: Observable<ProductDetailResponse>
  minPrice!: number
  constructor( private _route: ActivatedRoute,
    private _productFilterService: FilterProductService,
    private _hotelService: HotelService,
    private _progressSpinnerService: ProgressSpinnerService) { }

  ngOnInit(): void {
    /* Detect change value from QueryParams to update filter state */
    this.productDetail$ = this._route.queryParamMap
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
              benefits: benefits ? benefits.split(',').map(Number) : undefined,
              hotelFacilities: hotelFacilities
                ? hotelFacilities.split(',').map(Number)
                : undefined,
            },
          };
          this._productFilterService.nextProductFilterRequest(productFilterRequest)
          return this._hotelService.findDetailHotel(value, productFilterRequest)
        }),
      )
      
  }

}
