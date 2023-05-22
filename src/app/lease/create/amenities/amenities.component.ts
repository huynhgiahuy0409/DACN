import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HotelProfileService} from "../../../services/lease/hotel-profile.service";
import {HotelProfile} from "../../../models/model";

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent implements OnInit {

  _amenitiesList: amenities[] = [];

  getAll() {
    this._amenitiesList = [
      {id: 1, name: 'khăn các loại', isSelected: false},
      {id: 2, name: 'bàn/không gian làm việc', isSelected: false},
      {id: 3, name: 'đậu xe miễn phí', isSelected: false},
      {id: 4, name: 'máy điều hòa', isSelected: false},
      {id: 5, name: 'chìa khóa thông minh', isSelected: false},
      {id: 6, name: 'Wifi miễn phí', isSelected: false},
      {id: 7, name: 'Ban công hoặc sân hiên', isSelected: false},
      {id: 8, name: 'Khu đối diện bãi biển', isSelected: false},
      {id: 9, name: 'lối vào riêng', isSelected: false},
      {id: 10, name: 'lối vào riêng', isSelected: false},
      {id: 11, name: 'lối vào riêng', isSelected: false},
    ]

  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.rfAmenities.get('recomendation') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.name))
    } else {
      var i = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.name) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });

    }

  }

  rfAmenities!: FormGroup;

  constructor(private formBuilder: FormBuilder, private hotelProfileService: HotelProfileService) {
  }

  hp!: HotelProfile;

  submitForm() {
    this.hp =
      {
        id: 0,
        basic: this.hotelProfileService.basic
        ,
        location: this.hotelProfileService.location,
        description: this.hotelProfileService.description,
        amenities: this.rfAmenities.value,
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
    this.hotelProfileService.updateHotelProfile(this.hotelProfileService.id_lock, this.hp).subscribe(value => {

      this.hotelProfileService.amenities = value.amenities;
    })
  }

  ngOnInit(): void {
    this.getAll();
    this.rfAmenities = this.formBuilder.group({
      recomendation: this.formBuilder.array([]),


    });
  }


}

class amenities {
  id: number | undefined;
  name: string | undefined;
  isSelected: boolean = false;


}
