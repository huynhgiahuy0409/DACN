import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar-filter',
  templateUrl: './nav-bar-filter.component.html',
  styleUrls: ['./nav-bar-filter.component.scss']
})
export class NavBarFilterComponent implements OnInit {
  tabs: string[] = [
    "Phù hợp nhất",
    "Được đánh giá nhiều nhất",
    "Giá thấp nhất trước",
    "Ưu đãi nóng hổi"
  ];
  sltTabIdx = 0
  constructor() { }

  ngOnInit(): void {
  }

}
