import { Component, OnInit } from '@angular/core';
import { RedirectInfo } from 'src/app/models/model';
interface TabItem {
  idx: number;
  label: string;
  icon: string;
  title: string;
  subtitle: string;
}
@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss'],
})
export class HomeBannerComponent implements OnInit {
  tabList: TabItem[] = [
    {
      idx: 0,
      label: 'Khách sạn & Nhà',
      icon: '0',
      title: 'Khách sạn & nhà, nhà riêng tư',
      subtitle:
        'Nhận giá tốt nhất trên hơn 2,000,000 bất động sản trên toàn thế giới',
    },
    {
      idx: 1,
      label: 'Nhà riêng tư',
      icon: '1',
      title: 'Đặt một căn nhà riêng tư trên Spring Hotel',
      subtitle:
        'Nhận giá tốt nhất trên hơn 2,000,000 bất động sản trên toàn thế giới',
    },
  ];
  selectedTab: TabItem;
  constructor() {
    this.selectedTab = this.tabList[0];
  }

  ngOnInit(): void {}

  sltTab(tab: TabItem) {
    this.selectedTab = tab;
  }
}
