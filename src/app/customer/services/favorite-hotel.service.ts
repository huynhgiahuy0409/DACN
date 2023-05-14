import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DELETE_FAVORITE_HOTEL_BY_ID, FIND_ALL_FAVORITE_HOTEL, SAVE_FAVORITE_HOTEL } from 'src/app/models/constance';
import { FavoriteHotelResponse } from 'src/app/models/response';
import { Observable } from 'rxjs';
import { SaveFavoriteHotelRequest } from 'src/app/models/request';

@Injectable({
  providedIn: 'root'
})
export class FavoriteHotelService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) { }

  getAll(username: string): Observable<FavoriteHotelResponse[]> {
    this.httpOptions.params = {
      username: username
    };
    return this.httpClient.get<FavoriteHotelResponse[]>(`${FIND_ALL_FAVORITE_HOTEL}`, this.httpOptions);
  }

  save(favorite_hotel: SaveFavoriteHotelRequest): Observable<FavoriteHotelResponse> {
    return this.httpClient.post<FavoriteHotelResponse>(`${SAVE_FAVORITE_HOTEL}`, favorite_hotel);
  }

  deleteById(id: number): Observable<any> {
    this.httpOptions.params = {
      id: id
    };
    return this.httpClient.delete(`${DELETE_FAVORITE_HOTEL_BY_ID}`, this.httpOptions);
  }
}
