import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  stars =[1,2,3,4,5];
  rating=4;
  constructor() { }
  updateRating(r:any){
  this.rating=r;
  }
  ngOnInit(): void {
  }

}
