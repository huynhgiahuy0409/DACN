import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProductFilterRequest, SaveFavoriteHotelRequest } from 'src/app/models/request';
import { ProductDetailResponse } from 'src/app/models/response';
import { FilterProductService } from '../services/filter-product.service';
import { HotelService } from '../services/hotel.service';
import { ProgressSpinnerService } from '../services/progress-spinner.service';
import { FavoriteHotelService } from '../services/favorite-hotel.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productDetail$!: Observable<ProductDetailResponse>
  minPrice!: number
  constructor(private _route: ActivatedRoute,
    private _productFilterService: FilterProductService,
    private _hotelService: HotelService,
    private _progressSpinnerService: ProgressSpinnerService,
    private favoriteHotelService: FavoriteHotelService,
    private toastrService: ToastrService) { }

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

  onAddToFavoriteList(hotelId: number) {
    const data: SaveFavoriteHotelRequest = {
      hotelId: hotelId,
      username: 'tester' //test user only
    };

    this.favoriteHotelService.save(data).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Thành công !')
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error(err.error, 'Thất bại !')
      }
    })
  }

}
