import { TestBed } from '@angular/core/testing';

import { FavoriteHotelService } from './favorite-hotel.service';

describe('FavoriteHotelService', () => {
  let service: FavoriteHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
