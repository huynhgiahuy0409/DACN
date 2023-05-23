import { log } from 'console';
import { DIRECT_LINK } from 'src/app/models/constance';
import { ImageResponse, SearchedProductItemResponse } from './../../../../../models/response';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input()
  searchedProduct!: SearchedProductItemResponse
  isHoverReviewItem = false
  @Input()
  isSearchedProduct: boolean = false
  thumbImage!: ImageResponse
  hotelImages!: ImageResponse[]
  hoveredImage!: ImageResponse
  constructor() { }

  ngOnInit(): void {
      this.searchedProduct.hotelImages = this.searchedProduct.hotelImages.map(image => {
        return {...image, url: `${DIRECT_LINK}/hotel-img/${image.url}`}
      })
      this.thumbImage = this.searchedProduct.hotelImages.find(hotel => hotel.isThumbnail)!
      this.hotelImages = this.searchedProduct.hotelImages.filter(hotel => !hotel.isThumbnail)
      console.log(this.hotelImages);
      
  }

  computeStarCover(starRating: number): string{
    const coverNum = 100 - ((starRating * 100) / 5)
    return coverNum.toString() + "%";
  }
  hoverImage(image: ImageResponse){
    this.hoveredImage = image
    this.isHoverReviewItem = true
  }

}
