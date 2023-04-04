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
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs';
import { Occupancy, RedirectInfo } from 'src/app/models/model';
interface Tab {
  idx: number;
  label: string;
  title: string;
  subtitle: string;
}

interface StayType {
  idx: number;
  label: string;
  value: string;
}
@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss'],
})
export class HomeBannerComponent implements OnInit {
  @ViewChild('occupancyPopup')
  occupancyPopup!: ElementRef<HTMLDivElement>;
  @ViewChild('occupancyBox')
  occupancyBox!: ElementRef<HTMLDivElement>;
  @ViewChild('homeBanner')
  homeBanner!: ElementRef<HTMLDivElement>;
  isShowFilterBar: boolean = false
  enableOverlay: boolean = false;
  isEnableOccupancy = false;
  selectedTab!: Tab;
  ageOptions!: string[];
  tabList: Tab[] = [
    {
      idx: 0,
      label: 'Khách sạn & Nhà',
      title: 'Khách sạn & nhà, nhà riêng tư',
      subtitle:
        'Nhận giá tốt nhất trên hơn 2,000,000 bất động sản trên toàn thế giới',
    },
    {
      idx: 1,
      label: 'Nhà riêng tư',
      title: 'Đặt một căn nhà riêng tư trên Spring Hotel',
      subtitle:
        'Nhận giá tốt nhất trên hơn 2,000,000 bất động sản trên toàn thế giới',
    },
  ];
  selectedStayType!: StayType;
  stayTypes: StayType[] = [
    {
      idx: 0,
      label: 'Ở qua đêm',
      value: 'OVERNIGHT',
    },
    {
      idx: 1,
      label: 'Ở trong ngày',
      value: 'DAY-USE',
    },
  ];
  hotelAndHomeForm: any;
  occupancyOptions: Occupancy[] = [
    {
      idx: 0,
      label: 'Phòng',
      value: 1,
      add: (occupancy: Occupancy) => {
        occupancy.value++;
        this.occupancy.get('room')?.patchValue(occupancy.value);
      },
      remove: (occupancy: Occupancy) => {
        occupancy.value--;
        this.occupancy.get('room')?.patchValue(occupancy.value);
      },
    },
    {
      idx: 1,
      label: 'Người lớn',
      subLabel: 'Lớn hơn hoặc bằng 18 tuổi',
      value: 2,
      add: (occupancy: Occupancy) => {
        occupancy.value++;
        this.occupancy.get('adult')?.patchValue(occupancy.value);
      },
      remove: (occupancy: Occupancy) => {
        occupancy.value--;
        this.occupancy.get('adult')?.patchValue(occupancy.value);
      },
    },
    {
      idx: 2,
      label: 'Trẻ em',
      subLabel: 'Từ 0 tới 17 tuổi',
      value: 0,
      childOptions: [],
      add: (occupancy: Occupancy) => {
        occupancy.value++;
        this.children.push(this.__fb.control(this.ageOptions[0]));
      },
      remove: (occupancy: Occupancy) => {
        let length = occupancy.childOptions!.length
        occupancy.value--;
        this.children.removeAt(length - 1)
      },
    },
  ];
  overlayState = {
    isShow: false,
    currElement: undefined,
  };
  hotelAndHomeFormGroup!: FormGroup;
  privateHomeFormGroup!: FormGroup;
  constructor(private __fb: FormBuilder) {
    this.selectedTab = this.tabList[0];
    this.selectedStayType = this.stayTypes[0];
    this.ageOptions = this.createChildrenAgeRange();
    // form init
    this.hotelAndHomeFormGroup = this.__fb.group({
      stayType: this.selectedStayType.value,
      place: '',
      startDate: new Date(),
      endDate: new Date(),
      occupancy: this.__fb.group({
        room: this.occupancyOptions[0].value,
        adult: this.occupancyOptions[1].value,
        children: this.__fb.array([]),
      }),
    });
    this.privateHomeFormGroup = this.__fb.group({
      place: '',
      startDate: new Date(),
      endDate: new Date(),
      occupancy: this.__fb.group({
        room: this.occupancyOptions[0].value,
        adult: this.occupancyOptions[1].value,
        children: this.__fb.array([]),
      }),
    });
    this.hotelAndHomeFormGroup.valueChanges.subscribe((value) =>
      console.log(value)
    );
  }
  get children(): FormArray {
    return this.hotelAndHomeFormGroup
      .get('occupancy')
      ?.get('children') as FormArray;
  }
  get occupancy(): FormGroup {
    return this.hotelAndHomeFormGroup.get('occupancy') as FormGroup;
  }
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
  ngOnInit(): void {}

  sltTab(tab: Tab) {
    this.selectedTab = tab;
    this.enableOverlay = false;
    this.overlayState.isShow = false;
    this.isEnableOccupancy = false;
  }
  sltStayType(stayType: any, element: any) {
    this.selectedStayType = stayType;
    this.hotelAndHomeFormGroup.patchValue({
      stayType: stayType.value,
    });
    this.updateOverlayState(element);
  }
  updateOverlayState(element: any) {
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
  onClickOverlay(){
    this.overlayState.isShow = false
    this.overlayState.currElement = undefined
    this.isEnableOccupancy = false
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
  createChildrenAgeRange(): string[] {
    const result: string[] = [];
    result.push('< 0');
    for (let index = 1; index <= 17; index++) {
      result.push(index + '');
    }
    return result;
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Gọi hàm xử lý sự kiện scroll ở đây
    if(this.occupancyPopup){
      const occupancyPopupTop =
      this.occupancyPopup.nativeElement.getBoundingClientRect().top;
      if(occupancyPopupTop < 0){
        this.overlayState.currElement = undefined;
        this.overlayState.isShow = false
        this.isEnableOccupancy = false
      }
    }
    const homeBannerBottom = this.homeBanner.nativeElement.getBoundingClientRect().bottom
    
    if(homeBannerBottom < 0){
      this.isShowFilterBar = true
    }else{
      this.isShowFilterBar = false
    }
  }
}
