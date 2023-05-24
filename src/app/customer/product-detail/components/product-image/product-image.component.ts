import { Component, Input, OnInit } from '@angular/core';
import { DIRECT_LINK, URL_API } from 'src/app/models/constance';
import { ImageResponse } from 'src/app/models/response';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit {
  a = [[1,1], [1,1], [1,1]]
  viewImages!: ImageResponse[][]
  thumbImage!: ImageResponse
  @Input()
  images!: ImageResponse[]
  constructor() { }

  ngOnInit(): void {
    this.images = this.images.map(image => {
      return {...image, url: `${DIRECT_LINK}/hotel-img/${image.url}`}
    })
    this.thumbImage = this.images.find(image => image.isThumbnail)!
    this.images = this.images.filter(image => !image.isThumbnail)
    this.viewImages = Array.from(
      { length: Math.ceil(this.images.length / 2) },
      (_, index) => this.images.slice(index * 2, index * 2 + 2)
      );
      console.log(this.viewImages);
  }

}
