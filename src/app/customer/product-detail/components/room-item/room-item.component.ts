import { Component, Input, OnInit } from '@angular/core';
import { DIRECT_LINK } from 'src/app/models/constance';
import { RoomResponse } from 'src/app/models/response';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {
  @Input()
  room!: RoomResponse
  @Input()
  isMinPrice: boolean = false
  constructor() { }

  ngOnInit(): void {
    this.room.roomImages = this.room.roomImages.map(image => {
      return {...image, url: `${DIRECT_LINK}/room-img/${image.url}`}
    })
    
  }

}
