import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotelProfileService} from "../../../services/lease/hotel-profile.service";
import {HotelProfile} from "../../../models/model";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  _paymentList:payment[]=[];
  _channelManager :chanelManager[]=[

  ]


    getAll(){
    this._paymentList=[
      {id:1,title:'Tiền gửi trực tiếp vào ngân hàng',desc:'Qua hệ thống thanh toán được bảo mật của Agoda, chúng tôi sẽ chuyển khoản trực tiếp vào tài khoản ngân hàng của bạn sau khi khách hàng đã trả phòng.',isSelected:false},
      {id:2,title:'Chuyển khoản PayPal',desc:'Bạn sẽ được yêu cầu điền thông tin đăng nhập PayPal, chúng tôi sẽ thanh toán vào tài khoản PayPal của bạn sau khi khách hàng đã trả phòng.',isSelected:false}
    ]
      this._channelManager=[
        {id:1,name:"Có, tôi dùng",isSelected:false},
        {id:2,name:"Không",isSelected:false},
      ]
    }
  rfPricing!:FormGroup;
  constructor(private formBuilder: FormBuilder,private hotelProfileService:HotelProfileService) {
  }
  hp!: HotelProfile;
  submitForm(){
    console.log(this.rfPricing.value)
    this.hp =
      {
        id: 0,
        basic: this.hotelProfileService.basic
        ,
        location:this.hotelProfileService.location,
        description: this.hotelProfileService.description,
        amenities:this.hotelProfileService.amenities,
        pricing: this.rfPricing.value,
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

      this.hotelProfileService.pricing=value.pricing;
      console.log('pricingo')
      console.log(this.hotelProfileService.pricing)
    })
  }
  ngOnInit(): void {
    this.getAll();
    this.rfPricing= this.formBuilder.group({

      managerChannel : ['',Validators.required],

      price : ['',Validators.required],
      payment : ['',Validators.required],


    });
  }


}
class payment{
  id: number | undefined;
  title:string ='';
  desc:string='';
  isSelected :boolean=false;
}
class chanelManager{
  id: number | undefined ;
  name: string | undefined ;
  isSelected :boolean =false;


}
