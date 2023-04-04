import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  numAccommodations = 0;

  plusAccommodations() {
    this.numAccommodations = this.numAccommodations + 1;
  }

  minusAccommodations() {
    if (this.numAccommodations != 0) {
      this.numAccommodations = this.numAccommodations - 1;
    }
  }

  numBathroom = 0;

  plusBathroom() {
    this.numBathroom = this.numBathroom + 1;
  }

  minusBathroom() {
    if (this.numBathroom != 0) {
      this.numBathroom = this.numBathroom - 1;
    }
  }

  numBedroom = 0;

  plusBedroom() {
    this.numBedroom = this.numBedroom + 1;
  }

  minusBedroom() {
    if (this.numBedroom != 0) {
      this.numBedroom = this.numBedroom - 1;
    }
  }

  numberRoomOne = 0;

  plusRoomOne() {
    this.numberRoomOne = this.numberRoomOne  +1;
  }

  minusRoomOne() {
    if (this.numberRoomOne != 0) {
      this.numberRoomOne = this.numberRoomOne  -1;
    }
  }
  numberCommon = 0;

  plusCommon() {
    this.numberCommon = this.numberCommon  +1;
  }

  minusCommon() {
    if (this.numberCommon != 0) {
      this.numberCommon = this.numberCommon  -1;
    }
  }
  constructor() {
  }

  ngOnInit(): void {
  }

}
