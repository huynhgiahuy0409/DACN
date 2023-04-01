import { NgIf } from '@angular/common';
import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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
export class HomeBannerComponent
  implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked
{
  @ViewChild('occupancyPopup')
  occupancyPopup!: ElementRef<HTMLDivElement>;
  @ViewChild('occupancyBox')
  occupancyBox!: ElementRef<HTMLDivElement>;
  @ViewChild('homeBanner')
  homeBanner!: ElementRef<HTMLDivElement>;
  enableOverlay: boolean = false;
  tempChildren!: any[];
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
  selectedTab: TabItem = this.tabList[0];
  constructor() {}
  ngAfterViewChecked(): void {
    if (this.occupancyPopup) {
      const windowHeight = window.innerHeight;
      const elementBottom =
        this.occupancyPopup.nativeElement.getBoundingClientRect().bottom;
      const pageYOffset = window.pageYOffset;
      if (elementBottom > windowHeight) {
        const deltaElement = elementBottom - windowHeight;
        window.scrollTo({
          top: pageYOffset + deltaElement,
        });
      }
    }
  }
  ngAfterViewInit(): void {}
  ngDoCheck(): void {
    this.tempChildren = new Array(this.occupancyOptions[2].value);
  }
  ngOnChanges(changes: SimpleChanges): void {}
  stayTypes = [
    {
      idx: 0,
      label: 'Ở qua đêm',
    },
    {
      idx: 1,
      label: 'Ở trong ngày',
    },
  ];
  isEnableOccupancy = false;
  occupancyOptions = [
    {
      idx: 0,
      label: 'Phòng',
      subLabel: '',
      value: 1,
    },
    {
      index: 1,
      label: 'Người lớn',
      subLabel: 'Lớn hơn hoặc bằng 18 tuổi',
      value: 2,
    },
    {
      index: 2,
      label: 'Trẻ em',
      subLabel: 'Từ 0 tới 17 tuổi',
      value: 0,
    },
  ];
  selectedStayType = this.stayTypes[0];
  overlayState = {
    isShow: false,
    currElement: undefined,
  };
  ngOnInit(): void {}

  sltTab(tab: TabItem) {
    this.selectedTab = tab;
    this.enableOverlay = false;
    this.overlayState.isShow = false
    this.isEnableOccupancy = false
  }
  sltStayType(stayType: any, element: any) {
    this.selectedStayType = stayType;
    this.updateOverlayState(element);
  }

  updateChildrenOption(option: any, action: -1 | 1) {
    option.value = option.value + action;
  }
  updateOverlayState(element: any) {
    console.log(element);

    if (this.overlayState.currElement !== element) {
      this.overlayState.currElement = element;
      this.overlayState.isShow = true;
      this.isEnableOccupancy = false;
    } else {
      this.overlayState.currElement = undefined;
      this.overlayState.isShow = false;
      this.isEnableOccupancy = false;
    }
  }
  toggleOccupancy(element: any) {
    if (this.overlayState.currElement !== element) {
      this.overlayState.currElement = element;
      this.overlayState.isShow = true;
      this.isEnableOccupancy = true;
    } else {
      this.overlayState.currElement = undefined;
      this.overlayState.isShow = false;
      this.isEnableOccupancy = false;
    }
  }
}
