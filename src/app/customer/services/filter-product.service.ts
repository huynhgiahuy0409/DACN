import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from 'src/app/models/constance';
import { ProductFilterRequest } from 'src/app/models/request';
import { APIResponse, SearchedProductItemResponse } from 'src/app/models/response';

@Injectable({
  providedIn: 'root'
})
export class FilterProductService {
  constructor(private _httpClient: HttpClient) { }

  public filterProduct(productFilterRequest: ProductFilterRequest): Observable<APIResponse<SearchedProductItemResponse[]>> {
    let url = URL_API.concat(`/api/hotel/search`);
    return this._httpClient.post<APIResponse<SearchedProductItemResponse[]>>(url, productFilterRequest,
      {
        responseType: "json"
      })
  }
}
