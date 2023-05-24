import { Component, Input, OnInit } from '@angular/core';
import { RoomResponse } from 'src/app/models/response';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {
  @Input()
  room!: RoomResponse
  constructor() { }

  ngOnInit(): void {
  }

}
