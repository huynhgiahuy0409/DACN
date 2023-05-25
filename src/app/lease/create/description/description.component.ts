import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotelProfileService} from "../../../services/lease/hotel-profile.service";
import {AddressService} from "../../../services/lease/address.service";

import {RoomService} from "../../../services/lease/room.service";
import {RoomHotel} from "../basic/basic.component";

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
  constructor(private formBuilder: FormBuilder,private hotelProfileService:HotelProfileService, private addressService :AddressService,private roomService : RoomService) {
  }
 hd!:HotelDescription;
  submitForm(){

    this.hd ={
      id:0,
       name :this.rfDescription.controls['name'].value,
      description:this.rfDescription.controls['description'].value,
      address:this.addressService.hotelAddress,
      rooms:[this.roomService.room],

    };




   this.hotelProfileService.createHotelDescription(this.hd).subscribe(value => {
     this.hotelProfileService.id_lock =value.id;

     this.hotelProfileService.hotelDescription=value;
     console.log(this.hotelProfileService.id_lock);
     console.log(this.hotelProfileService.hotelDescription)
   })

  }
  ngOnInit(): void {
    this.rfDescription= this.formBuilder.group({
      name : ['',Validators.required],
      description : ['',Validators.required],


    });
  }


}
export  class HotelDescription{
  id:number=0;
  name:string='';
  description:string='';

  address!:HotelAddress;
  rooms:RoomHotel[]=[];



}
export  class HotelAddress{
  id:number=0;
  street:string =''
}
export  class HotelImage{
  id:number=0;
  isThumbnail:boolean=false;
  url:string='';

  hotel!:HotelDescription;
}
