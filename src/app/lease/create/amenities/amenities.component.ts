import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent implements OnInit {

  _amenitiesList :amenities[] =[

  ];

  getAll(){
    this._amenitiesList=[
      {id:1,name:'khăn các loại',isSelected:false},
      {id:2,name:'bàn/không gian làm việc',isSelected:false},
      {id:3,name:'đậu xe miễn phí',isSelected:false},
      {id:4,name:'máy điều hòa',isSelected:false},
      {id:5,name:'chìa khóa thông minh',isSelected:false},
      {id:6,name:'Wifi miễn phí',isSelected:false},
      {id:7,name:'Ban công hoặc sân hiên',isSelected:false},
      {id:8,name:'Khu đối diện bãi biển',isSelected:false},
      {id:9,name:'lối vào riêng',isSelected:false},
      {id:10,name:'lối vào riêng',isSelected:false},
      {id:11,name:'lối vào riêng',isSelected:false},
    ]

  }

  constructor() { }

  ngOnInit(): void {
    this.getAll();
  }

}
class amenities{
  id: number | undefined ;
  name: string | undefined ;
  isSelected :boolean =false;


}
