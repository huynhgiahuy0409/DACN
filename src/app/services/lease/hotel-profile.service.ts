import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Amenities, Basic, Description, HotelProfile, Location, Photos, Pricing, Profile} from "../../models/model";

@Injectable({
  providedIn: 'root'
})
export class HotelProfileService {


  private baseUrl = "http://localhost:8080/api/v1/";

  id_lock: number = 1;
  basic!: Basic;
  location!:Location

  description!: Description;

  amenities!: Amenities;
  pricing!: Pricing;
  photos!: Photos;
  profile!: Profile;

  constructor(private httpClient: HttpClient) {
  }

  getAllHotelProfiles(): Observable<HotelProfile[]> {
    return this.httpClient.get<HotelProfile[]>(`${this.baseUrl}hotel_profiles`);
  }

  createHotelProfile(hotelProfile: HotelProfile): Observable<HotelProfile> {
    return this.httpClient.post<HotelProfile>(`${this.baseUrl}hotel_profile`, hotelProfile);
  }

  updateHotelProfile(id: number, hotelProfile: HotelProfile): Observable<HotelProfile> {
    return this.httpClient.put<HotelProfile>(`${this.baseUrl}hotel_profiles/${id}`, hotelProfile);
  }

  deleteHotelProfile(id: number): Observable<HotelProfile> {
    return this.httpClient.delete<HotelProfile>(`${this.baseUrl}hotel_profiles/${id}`);

  }
}
