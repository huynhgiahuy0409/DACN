import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Amenities, Basic, Description, HotelProfile, Location, Photos, Pricing, Profile} from "../../../models/model";
import {HotelProfileService} from "../../../services/lease/hotel-profile.service";

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
    this.numberRoomOne = this.numberRoomOne + 1;
  }

  minusRoomOne() {
    if (this.numberRoomOne != 0) {
      this.numberRoomOne = this.numberRoomOne - 1;
    }
  }

  numberCommon = 0;

  plusCommon() {
    this.numberCommon = this.numberCommon + 1;
  }

  minusCommon() {
    if (this.numberCommon != 0) {
      this.numberCommon = this.numberCommon - 1;
    }
  }

  _listComparisonBusiness: comparisonBussiness[] = [];


  getAllListComparisonBusiness() {
    this._listComparisonBusiness = [
      {
        icon: 'home',
        name: 'Toàn bộ căn hộ',
        isSelected: false
      },
      {
        icon: 'home',
        name: 'Toàn bộ nhà trệt',
        isSelected: false
      },
      {
        icon: 'home',
        name: 'Toàn bộ nhà riêng',
        isSelected: false
      },
      {
        icon: 'home',
        name: 'Biệt thự',
        isSelected: false
      }
    ]
  }

  changValueComparisonBusiness(name: string) {


    this.rfBasic.controls['typeComparisionBusiness'].setValue(name)

  }

  rfBasic!: FormGroup;

  constructor(private formBuilder: FormBuilder, private hotelProfileService: HotelProfileService) {
  }

  defaultTypeRoomOne: string = 'Giường đơn';
  defaultTypeCommon: string = 'Giường đơn';
  displayError: boolean = false;


  basic!: Basic;
  id_lock!:number;
  ngOnInit(): void {
    this.getAllListComparisonBusiness();


    this.rfBasic = this.formBuilder.group({
      typeComparisionBusiness: ['', Validators.required],

      numComparisionBusiness: ['', Validators.required],
      numAccommodations: ['', Validators.required],
      numBathroom: ['', Validators.required],

      numBedroom: ['', Validators.required],

      numRoomOne: ['', Validators.required],
      typeRoomOne: ['', Validators.required],
      numCommon: ['', Validators.required],
      typeCommon: ['', Validators.required],

    });
    console.log(this.rfBasic.controls['typeComparisionBusiness'].value,)


  }


  submitted = false;

  hp!: HotelProfile;



  onSubmit() {
    this.submitted = true;


    this.hp =
      {
        id: 0,
        basic: this.rfBasic.value
        ,
        location: {
          address: "",
          city: "",
          country: "",
          house: ""
        },
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


    this.hotelProfileService.createHotelProfile(this.hp).subscribe(value => {

      this.hotelProfileService.id_lock=value.id;
      this.hotelProfileService.basic=value.basic;
      console.log('id lock')
      console.log(this.hotelProfileService.id_lock);
      console.log('basic')
      console.log(this.hotelProfileService.basic);

    })

  }
}

class comparisonBussiness {
  icon: string = '';
  name: string = '';

  isSelected: boolean = false;
}

