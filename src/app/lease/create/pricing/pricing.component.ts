import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  _paymentList:payment[]=[];
  _channelManager :chanelManager[]=[

  ]
  constructor() { }

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

  ngOnInit(): void {
    this.getAll();
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
