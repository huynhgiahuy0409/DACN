import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { log } from 'console';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';
import { OccupancyOption } from 'src/app/models/model';
import { ProductFilterRequest } from 'src/app/models/request';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  @ViewChild('occupancyPopup')
  occupancyPopup!: ElementRef<HTMLDivElement>;
  @ViewChild('occupancyBox')
  occupancyBox!: ElementRef<HTMLDivElement>;
  @ViewChild('homeBanner')
  homeBanner!: ElementRef<HTMLDivElement>;
  enableOverlay: boolean = false;
  isEnableOccupancy = false;
  ageOptions!: string[];

  hotelAndHomeForm: any;
  overlayState = {
    isShow: false,
    currElement: undefined,
  };
  hotelFormGroup!: FormGroup;
  privateHomeFormGroup!: FormGroup;
  constructor(private _fb: FormBuilder, public filterProductService: FilterProductService) {
    this.hotelFormGroup = filterProductService.hotelFormGroup
    this.privateHomeFormGroup = this._fb.group({
      place: '',
      startDate: new Date(),
      endDate: new Date(),
      occupancy: this._fb.group({
        room: filterProductService.occupancyOptions[0].value,
        adult: filterProductService.occupancyOptions[1].value,
        children: filterProductService.occupancyOptions[2].value,
      }),
    });
    this.hotelFormGroup.valueChanges.subscribe((value) => {}
    );
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
  ngAfterViewInit(): void { }
  ngOnInit(): void {
    this.filterProductService.productFilterRequest$.subscribe((filter: ProductFilterRequest | null) => {
      if (filter) {
        console.log(filter)
        const { startDate, endDate, search, adults, children, rooms, type, value } = filter
        this.hotelFormGroup.patchValue({
          search,
          startDate,
          endDate,
          occupancy: {
            rooms,
            adults,
            children
          },
          type,
          value
        })
      }
    })
    // this.filterProductService.hotelFormGroup.valueChanges.subscribe(v => console.log(v))
    this.hotelFormGroup.valueChanges.subscribe(v => console.log(v))
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
  onClickOverlay() {
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
    if (this.occupancyPopup) {
      const occupancyPopupTop =
        this.occupancyPopup.nativeElement.getBoundingClientRect().top;
      if (occupancyPopupTop < 0) {
        this.overlayState.currElement = undefined;
        this.overlayState.isShow = false
        this.isEnableOccupancy = false
      }
    }
  }
}
