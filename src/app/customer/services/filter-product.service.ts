import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { URL_API } from 'src/app/models/constance';
import { OptionFilter, ProductFilterRequest } from 'src/app/models/request';
import { APIResponse, FilterOptionItemResponse, SearchedProductItemResponse, SearchedProductResponse } from 'src/app/models/response';

@Injectable({
  providedIn: 'root'
})
export class FilterProductService implements OnInit {

  private productFilterRequestBSub: BehaviorSubject<ProductFilterRequest | null> = new BehaviorSubject<ProductFilterRequest | null>(null)
  productFilterRequest$ = this.productFilterRequestBSub.asObservable()

  private searchedProductResponseBSub: BehaviorSubject<SearchedProductResponse | null> = new BehaviorSubject<SearchedProductResponse | null>(null)
  searchedProductResponse$ = this.searchedProductResponseBSub.asObservable()

  nextSearchedProductResponse(value: SearchedProductResponse | null) {
    this.searchedProductResponseBSub.next(value)
  }
  get currSearchedProductResponseValue() {
    return this.searchedProductResponseBSub.value
  }

  nextProductFilterRequest(value: ProductFilterRequest) {
    this.productFilterRequestBSub.next(value)
  }
  get currProductFilterRequest() {
    return this.productFilterRequestBSub.value;
  }
  constructor(private _httpClient: HttpClient) {

  }
  ngOnInit(): void {
    this.productFilterRequest$.subscribe(v => console.log(v))
    this.searchedProductResponse$.subscribe(v => console.log(v))
  }

  public filterProduct(productFilterRequest: ProductFilterRequest): Observable<APIResponse<SearchedProductResponse>> {
    let url = URL_API.concat(`/api/hotel/search`);
    return this._httpClient.post<APIResponse<SearchedProductResponse>>(url, productFilterRequest,
      {
        responseType: "json"
      })
  }
  public findBenefitOptions(productFilterRequest: ProductFilterRequest): Observable<FilterOptionItemResponse[]> {
    let url = URL_API.concat(`/api/filter/option/benefits`);
    return this._httpClient.post<FilterOptionItemResponse[]>(url,productFilterRequest,
      {
        responseType: "json"
      })
  }
  public findUserRateOptions(productFilterRequest: ProductFilterRequest): Observable<FilterOptionItemResponse[]> {
    let url = URL_API.concat(`/api/filter/option/user-rates`);
    return this._httpClient.post<FilterOptionItemResponse[]>(url, productFilterRequest,
      {
        responseType: "json"
      })
  }
  public findHotelFacilityOptions(productFilterRequest: ProductFilterRequest): Observable<FilterOptionItemResponse[]> {
    let url = URL_API.concat(`/api/filter/option/hotel-facilities`);
    return this._httpClient.post<FilterOptionItemResponse[]>(url, productFilterRequest,
      {
        responseType: "json"
      })
  }
  public findDiscountOptions(productFilterRequest: ProductFilterRequest): Observable<FilterOptionItemResponse[]> {
    let url = URL_API.concat(`/api/filter/option/discounts`);
    return this._httpClient.post<FilterOptionItemResponse[]>(url, productFilterRequest,
      {
        responseType: "json"
      })
  }
}
