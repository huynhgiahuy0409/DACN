import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  public countryData = [
    {country: 'Choose country',},
    {
      country: 'Viet Nam', city: [
        'Ha Noi',
        'Tp Hcm',
        'Da Nang'
      ]
    },
    {
      country: 'Thai land', city: [
        'Thai1',
        'thai2',
        'Da Nang'
      ]
    }
  ]
  public city: string[] = [];

  changeCountry(event: any) {
    const country = event.target.value;
    console.log(country)
    if (!country) return;
    this.city = this.countryData.find((data) => data.country === country)?.city || [];

  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
