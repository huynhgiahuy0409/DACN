import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Occupancy } from 'src/app/models/model';

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
    this.ageOptions = this.createChildrenAgeRange();
    // form init
    this.hotelAndHomeFormGroup = this.__fb.group({
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
      console.log(occupancyPopupTop);
      if(occupancyPopupTop < 0){
        this.overlayState.currElement = undefined;
        this.overlayState.isShow = false
        this.isEnableOccupancy = false
      }
    }
  }
}
