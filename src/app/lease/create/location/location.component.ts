import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotelProfileService} from "../../../services/lease/hotel-profile.service";
import {BasicComponent} from "../basic/basic.component";
import {HotelProfile} from "../../../models/model";

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

  rfLocation!:FormGroup;
  constructor(private formBuilder: FormBuilder,private hotelProfileService:HotelProfileService) {
  }
  hp!: HotelProfile;
  submitForm(){

    this.hp =
      {
        id: 0,
        basic: this.hotelProfileService.basic
        ,
        location: this.rfLocation.value,
        description: {
          move: "",
          descHouse: "",
          nameHouse: "",
          rule: "",
          suggest: "",
          star: 0
        },
        amenities: {
          recomendation: []
        },
        pricing: {
          price: 0,
          payment: "",
          managerChannel: ""
        },
        photos: {
          file: "",
          fileSource: []
        },
        profile: {
          typeHost: "",
          company: {
            addressCompany: "",
            nameCompany: "",
            codeAreaCompany: ""
          },
          mySelf: {
            date: "",
            firstName: "",
            lastName: ""
          }
        },
      }


    this.hotelProfileService.updateHotelProfile(this.hotelProfileService.id_lock,this.hp).subscribe(value => {
      console.log(value)
      console.log(value.id)
      this.hotelProfileService.location=value.location;
    })

  }
  ngOnInit(): void {
    this.rfLocation= this.formBuilder.group({
      address : ['',Validators.required],

      house : ['',Validators.required],
      country : ['',Validators.required],
      city : ['',Validators.required],


    });
  }

}
