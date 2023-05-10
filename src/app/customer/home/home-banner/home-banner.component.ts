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
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, debounce, debounceTime, distinctUntilChanged, filter, of, switchMap, tap, timeout, timer } from 'rxjs';
import { Occupancy, RedirectInfo } from 'src/app/models/model';
import { HotelService } from '../../services/hotel.service';
import { AutocompleteSearchResponse } from 'src/app/models/response';
import { ProgressSpinnerService } from '../../services/progress-spinner.service';
import { NavigationExtras, Router } from '@angular/router';
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
  @ViewChild('occupancyLineForm')
  occupancyLineForm!: ElementRef<HTMLDivElement>;
  @ViewChild('occupancyBox')
  occupancyBox!: ElementRef<HTMLDivElement>;
  @ViewChild('homeBanner')
  homeBanner!: ElementRef<HTMLDivElement>;
  @ViewChild('autocompleteSearch')
  autocompleteSearch!: ElementRef<HTMLDivElement>;
  @ViewChild('locationLineForm')
  locationLineForm!: ElementRef<HTMLDivElement>;


  isShowFilterBar: boolean = false
  isEnableAutocompleteSearch: boolean = true
  overlaySwitchBSub: BehaviorSubject<boolean> = new BehaviorSubject(false)
  overlaySwitch$ = this.overlaySwitchBSub.asObservable()
  isEnableOccupancy = false;
  ageOptions!: string[];
  selectedTab!: Tab;
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
        this.occupancy.get('adults')?.patchValue(occupancy.value);
      },
      remove: (occupancy: Occupancy) => {
        occupancy.value--;
        this.occupancy.get('adults')?.patchValue(occupancy.value);
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
  overlayState: { isShow: boolean, currElement: Element | undefined } = {
    isShow: false,
    currElement: undefined,
  };

  overlayStateBSub: BehaviorSubject<{ isShow: boolean, currElement: Element | undefined }> = new BehaviorSubject(this.overlayState)
  overlayState$ = this.overlayStateBSub.asObservable()
  get curOverlayState() {
    return this.overlayStateBSub.value
  }

  autocompleteSearchs$!: Observable<AutocompleteSearchResponse[]>
  hotelAndHomeFormGroup!: FormGroup;
  privateHomeFormGroup!: FormGroup;
  constructor(private __fb: FormBuilder, private _hotelService: HotelService, private _progressSpinnerService: ProgressSpinnerService, private _router: Router) {
    this.selectedTab = this.tabList[0];
    this.selectedStayType = this.stayTypes[0];
    this.ageOptions = this.createChildrenAgeRange();
    // form init
    this.hotelAndHomeFormGroup = this.__fb.group({
      search: [""],
      stayType: [this.selectedStayType.value, Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      occupancy: this.__fb.group({
        rooms: this.occupancyOptions[0].value,
        adults: this.occupancyOptions[1].value,
        children: this.__fb.array([]),
      }),
      value: [""],
      type: [""]
    });
    this.hotelAndHomeFormGroup.valueChanges.subscribe(value => {
      console.log(value)
    })


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
  }
  get hotelPlaceControl(): FormControl {
    return this.hotelAndHomeFormGroup.get("search") as FormControl
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
  ngAfterViewInit(): void {
    this.overlayState$.subscribe(value => {
      this.isEnableOccupancy = value.currElement !== this.occupancyLineForm.nativeElement ? false : true
      if (value.currElement !== this.locationLineForm.nativeElement) {
        this.isEnableAutocompleteSearch = false
      } else if (value.currElement === this.locationLineForm.nativeElement) {
        this.isEnableAutocompleteSearch = true
      }
    })
  }
  ngOnInit(): void {
    this.autocompleteSearchs$ = this.hotelPlaceControl.valueChanges.pipe(
      debounceTime(500),
      tap(_ => {
        this._progressSpinnerService.next(true)
      }),
      switchMap((search: string) => {
        if (search.trim()) {
          return this._hotelService.getAutocompleteSearch(search)
        }
        return of([])
      }),
      tap(response => {
        this._progressSpinnerService.next(false)
      }),
    )
  }
  updateOverlayState(element: Element) {
    let { isShow, currElement } = this.curOverlayState
    if (isShow === true) {
      // select another element
      if (currElement !== element) {
        currElement = element
      }
      // retarget pre element
      else {
        if(element === this.autocompleteSearch.nativeElement){
          currElement = element
          isShow = true
        }else {
          currElement = undefined
          isShow = false
        }
      }
    } else {
      // init 
      if (currElement !== element) {
        currElement = element
        isShow = true
      }
    }
    this.overlayStateBSub
      .next({
        isShow: isShow,
        currElement: currElement
      })
    
  }
  sltTab(tab: Tab) {
    this.selectedTab = tab;
    this.overlayStateBSub.next({
      isShow: false,
      currElement: undefined
    })
  }
  sltStayType(stayType: any, element: any) {
    this.selectedStayType = stayType;
    this.hotelAndHomeFormGroup.patchValue({
      stayType: stayType.value,
    });
  }
  onClickOverlay() {
    this.overlayStateBSub.next({
      isShow: false,
      currElement: undefined
    })
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
    if (this.occupancyPopup) {
      const occupancyPopupTop =
        this.occupancyPopup.nativeElement.getBoundingClientRect().top;
      if (occupancyPopupTop < 0) {
        this.overlayState.currElement = undefined;
        this.overlayState.isShow = false
        this.isEnableOccupancy = false
      }
    }
    const homeBannerBottom = this.homeBanner.nativeElement.getBoundingClientRect().bottom

    if (homeBannerBottom < 0) {
      this.isShowFilterBar = true
    } else {
      this.isShowFilterBar = false
    }
  }
  selectAutocomplete(autocompleteSearch: AutocompleteSearchResponse) {
    this.hotelAndHomeFormGroup.get("value")!.patchValue(autocompleteSearch.value)
    this.hotelAndHomeFormGroup.get("type")!.patchValue(autocompleteSearch.type)
  }
  onSubmitSearch(){
    const {place, startDate, endDate, occupancy, value, type} = this.hotelAndHomeFormGroup.value
    const navigationExtras: NavigationExtras = {
      queryParams: {
        textToSearch: place,
        checkIn: new Date(startDate).toISOString(),
        checkOut: new Date(endDate).toISOString(),
        rooms: occupancy.rooms,
        adults: occupancy.adults,
        children: occupancy.children.length,
        value: value,
        type: type
      }
    }
    this._router.navigate(["/search"], navigationExtras)
  }
}
