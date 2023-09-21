import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  sidebarNavigates = [
    {
      label: 'Hồ sơ',
      path: 'profile',
      icon: '',
      scrollIntoViewList: [
        {
          label: 'Thông tin người dùng',
          path: "user-detail"
        },
        {
          label: 'Phương thức thanh toán',
          path: "payment-method"
        },
      ],
    },
    {
      label: 'Đơn đặt chỗ của tôi',
      path: 'bookings',
      icon: '',
      scrollIntoViewList: [],
    },
  ];
  
  constructor(private router: Router, private route: ActivatedRoute){}
  ngOnInit(): void {}
 
}
