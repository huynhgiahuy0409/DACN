import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { URL_API } from 'src/app/models/constance';
import { ProductFilterRequest } from 'src/app/models/request';
import { APIResponse, SearchedProductItemResponse, SearchedProductResponse } from 'src/app/models/response';

@Injectable({
  providedIn: 'root'
})
export class FilterProductService {

  private productFilterRequestBSub: BehaviorSubject<ProductFilterRequest | null> = new BehaviorSubject<ProductFilterRequest | null>(null)
  productFilterRequest$ = this.productFilterRequestBSub.asObservable()

  nextProductFilterRequest(value: ProductFilterRequest) {
    this.productFilterRequestBSub.next(value)
  }
  get currProductFilterRequest() {
    return this.productFilterRequestBSub.value;
  }
  constructor(private _httpClient: HttpClient) {
    this.productFilterRequest$.subscribe(v => console.log(v))
  }

  public filterProduct(productFilterRequest: ProductFilterRequest): Observable<APIResponse<SearchedProductResponse>> {
    let url = URL_API.concat(`/api/hotel/search`);
    return this._httpClient.post<APIResponse<SearchedProductResponse>>(url, productFilterRequest,
      {
        responseType: "json"
      })
  }
}
