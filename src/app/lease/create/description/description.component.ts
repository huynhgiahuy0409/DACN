import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotelProfileService} from "../../../services/lease/hotel-profile.service";
import {HotelProfile} from "../../../models/model";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  stars =[1,2,3,4,5];
  rating=4;

  updateRating(r:any){
  this.rating=r;
  this.rfDescription.controls['star'].setValue(r);
  }
  rfDescription!:FormGroup;
  constructor(private formBuilder: FormBuilder,private hotelProfileService:HotelProfileService ) {
  }
  hp!: HotelProfile;
  submitForm(){
    this.hp =
      {
        id: 0,
        basic: this.hotelProfileService.basic
        ,
        location:this.hotelProfileService.location,
        description: this.rfDescription.value,
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

      this.hotelProfileService.description=value.description;
    })


  }
  ngOnInit(): void {
    this.rfDescription= this.formBuilder.group({
      nameHouse : ['',Validators.required],
      descHouse : ['',Validators.required],

      suggest : ['',Validators.required],
      rule : ['',Validators.required],
      move : ['',Validators.required],
      star :['']

    });
  }


}
