import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-rating',
  templateUrl: './start-rating.component.html',
  styleUrls: ['./start-rating.component.scss']
})
export class StartRatingComponent implements OnInit {
  @Input() 
  fillColor: string = 'gold'
  @Input()
  cover: string = '20%'
  constructor() { }

  ngOnInit(): void {
  }

}
