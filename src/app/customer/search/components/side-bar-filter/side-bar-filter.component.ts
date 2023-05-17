import { KeyValue } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { id } from 'date-fns/locale';
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  debounceTime,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  timeout,
} from 'rxjs';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';
import { OptionFilter, ProductFilterRequest } from 'src/app/models/request';
import {
  FilterOptionItemResponse,
  OptionResponse,
  SearchedProductResponse,
} from 'src/app/models/response';
export interface RadioOption {
  label: string;
  value: any;
  total?: number;
}
export interface CheckBoxOption {
  checked: boolean;
  label: string;
  value: any;
  total?: number;
}
export interface FilterField {
  type: string;
  name: string;
  label: string;
  value?: string[] | string;
  color: 'primary' | 'accent';
  validation?: any;
  radioOptions?: RadioOption[];
  checkOptions?: CheckBoxOption[];
}
export interface SelectedField {
  label: string;
  selectedCheckOptions: SelectedCheckOption[];
}
export interface SelectedCheckOption {
  name: string;
  label: string;
  value: any;
  checked: boolean;
}
@Component({
  selector: 'app-side-bar-filter',
  templateUrl: './side-bar-filter.component.html',
  styleUrls: ['./side-bar-filter.component.scss'],
})
export class SideBarFilterComponent
  implements OnInit, OnChanges, AfterViewInit
{
  searchedProduct$!: Observable<SearchedProductResponse | null>;
  minFinalPrice!: number;
  maxFinalPrice!: number;
  priceFrom!: number;
  priceTo!: number;
  @ViewChild('thumbLeftInput', { static: true })
  thumbLeftInput!: ElementRef;
  @ViewChild('thumbRightInput')
  thumbRightInput!: ElementRef;
  @ViewChild('thumbLeft')
  thumbLeft!: ElementRef;
  @ViewChild('thumbRight')
  thumbRight!: ElementRef;
  @ViewChild('range')
  range!: ElementRef;
  priceFromControl = new FormControl();
  filterFields: FilterField[] = [
    {
      type: 'radio',
      name: 'discount',
      label: 'Ưu đãi và giảm giá',
      radioOptions: [],
      value: '',
      color: 'primary',
    },
    {
      type: 'checkbox',
      name: 'hotelFacilities',
      label: 'Tiện nghi chỗ nghỉ',
      checkOptions: [],
      color: 'primary',
    },
    {
      type: 'radio',
      name: 'guestRating',
      label: 'Đánh giá',
      value: '',
      radioOptions: [],
      color: 'primary',
    },
    {
      type: 'checkbox',
      name: 'benefits',
      label: 'Chọn phòng có',
      value: '',
      checkOptions: [],
      color: 'primary',
    },
  ];
  filterFormGroup!: FormGroup;
  myFilterField: FilterField = {
    type: 'checkbox',
    name: 'myfilter',
    label: 'Bộ lọc của quý khách',
    checkOptions: [],
    color: 'primary',
  };
  selectedField: SelectedField = {
    label: 'Bộ lọc của quý khách',
    selectedCheckOptions: [],
  };
  get discountControl(): FormControl {
    return this.filterFormGroup.get('discount') as FormControl;
  }
  priceFromBSub: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);
  priceFrom$ = this.priceFromBSub.asObservable().pipe(debounceTime(1000));
  priceToBSub: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);
  priceTo$ = this.priceToBSub.asObservable().pipe(debounceTime(1000));
  constructor(
    private __fb: FormBuilder,
    private _productFilterService: FilterProductService,
    private cdr: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.filterFormGroup = this.__fb.group({});
    this.filterFormGroup.valueChanges.subscribe((formValue) => {
      console.log(formValue);
    });
  }
  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {
    this.priceFrom$.subscribe((value) => {
      if (value) {
        const queryParams = { ...this._route.snapshot.queryParams };
        console.log(queryParams);
        
        queryParams['priceFrom'] = value;

        this._router.navigate([], {
          queryParams,
          replaceUrl: true,
          queryParamsHandling: 'merge',
        });
      }
    });
    this.priceTo$.subscribe((value) => {
      if (value) {
        const queryParams = { ...this._route.snapshot.queryParams };

        queryParams['priceTo'] = value;

        this._router.navigate([], {
          queryParams,
          replaceUrl: true,
          queryParamsHandling: 'merge',
        });
      }
    });
    /* Process slider range when server response searchedProduct */
    this._productFilterService.searchedProductResponse$
      .subscribe((searchedProduct) => {
        if (searchedProduct) {
          this.minFinalPrice = searchedProduct.minFinalPrice;
          this.maxFinalPrice = searchedProduct.maxFinalPrice;
          this.priceFrom = this.minFinalPrice;
          this.priceTo = this.maxFinalPrice;
          let currFilter: ProductFilterRequest | null =
            this._productFilterService.currProductFilterRequest;
          if (currFilter?.optionFilter?.priceFrom) {
            this.priceFrom = currFilter?.optionFilter?.priceFrom;
          }
          if (currFilter?.optionFilter?.priceTo) {
            this.priceTo = currFilter?.optionFilter?.priceTo;
          }
          this.changeLeftSlider('update');
          this.changeRightSlider('update');
        }
      });
    /* Fetch options for filterbar */
    this._productFilterService.productFilterRequest$
      .pipe(
        switchMap((filter) => {
          let benefitOptions$ = this._productFilterService.findBenefitOptions(
            filter!
          );
          let userRateOptions$ = this._productFilterService.findUserRateOptions(
            filter!
          );
          let hotelFacilities$ =
            this._productFilterService.findHotelFacilityOptions(filter!);
          let discountOptions$ = this._productFilterService.findDiscountOptions(
            filter!
          );
          return forkJoin([
            benefitOptions$,
            userRateOptions$,
            hotelFacilities$,
            discountOptions$,
          ]);
        })
      )
      .subscribe((options) => {
        const curFilter: ProductFilterRequest =
          this._productFilterService.currProductFilterRequest!;
        const optionFilter: OptionFilter | undefined = curFilter!.optionFilter;
        let benefitOptions: FilterOptionItemResponse[] = options[0];
        let userRateOptions: FilterOptionItemResponse[] = options[1];
        let hotelFacilityOptions: FilterOptionItemResponse[] = options[2];
        let discountOptions: FilterOptionItemResponse[] = options[3];

        const benefitIds: number[] | null =
          optionFilter &&
          optionFilter.benefits &&
          optionFilter.benefits.length > 0
            ? optionFilter.benefits
            : null;
        this.filterFields[3].checkOptions = this.buildCheckboxOptions(
          benefitOptions,
          this.filterFields[3].name,
          benefitIds
        );
        const sltUserRate: string | null =
          optionFilter && optionFilter.guestRating
            ? optionFilter.guestRating
            : null;
        this.filterFields[2].radioOptions = this.buildRadioOptions(
          userRateOptions,
          this.filterFields[2],
          sltUserRate
        );
        const hotelFacityIds: number[] | null =
          optionFilter &&
          optionFilter.hotelFacilities &&
          optionFilter.hotelFacilities.length > 0
            ? optionFilter.hotelFacilities
            : null;
        this.filterFields[1].checkOptions = this.buildCheckboxOptions(
          hotelFacilityOptions,
          this.filterFields[1].name,
          hotelFacityIds
        );
        const discountValue: string | null =
          optionFilter && optionFilter.discount ? optionFilter.discount : null;
        this.filterFields[0].radioOptions = this.buildRadioOptions(
          discountOptions,
          this.filterFields[0],
          discountValue
        );
      });
  }
  private buildCheckboxOptions(
    fetchedOptions: FilterOptionItemResponse[],
    dynamicFieldName: string,
    seletedIds: any[] | null
  ): CheckBoxOption[] {
    return fetchedOptions.map(
      (filterOptionResponse: FilterOptionItemResponse) => {
        const { name, value, total } = filterOptionResponse;
        let checked =
          seletedIds &&
          seletedIds?.includes(Number.parseInt(filterOptionResponse.value))
            ? true
            : false;
        if (checked) {
          let sltOptTmp: SelectedCheckOption = {
            name: dynamicFieldName,
            label: name,
            value: value,
            checked: checked,
          };
          let foundSltOption: SelectedCheckOption | undefined =
            this.selectedField.selectedCheckOptions.find(
              (option) =>
                option.name == sltOptTmp.name && option.value == sltOptTmp.value
            );
          if (!foundSltOption) {
            this.selectedField.selectedCheckOptions.unshift(sltOptTmp);
          }
        }
        return {
          checked: checked,
          label: name,
          value: value,
          total: total,
        } as CheckBoxOption;
      }
    );
  }
  private buildRadioOptions(
    fetchedOptions: FilterOptionItemResponse[],
    dynamicField: FilterField,
    selecteValue: any
  ): RadioOption[] {
    return fetchedOptions.map(
      (filterOptionResponse: FilterOptionItemResponse) => {
        const { name, value, total } = filterOptionResponse;
        let isValue: boolean = selecteValue == value;
        if (isValue) {
          let sltOptTmp: SelectedCheckOption = {
            name: dynamicField.name,
            label: name,
            value: value,
            checked: isValue,
          };
          let foundSltOption: SelectedCheckOption | undefined =
            this.selectedField.selectedCheckOptions.find(
              (option) =>
                option.name == sltOptTmp.name && option.value == sltOptTmp.value
            );
          if (!foundSltOption) {
            this.selectedField.selectedCheckOptions.unshift(sltOptTmp);
          }
          dynamicField.value = value;
        }
        return {
          label: name,
          value: value,
          total: total,
        } as RadioOption;
      }
    );
  }
  changeLeftSlider(type: 'update' | 'change') {
    let thumbWidth = this.thumbLeft.nativeElement.offsetWidth;
    this.thumbLeftInput.nativeElement.value = this.priceFrom = Math.min(
      this.priceFrom,
      this.priceTo - 1
    );

    const percent =
      ((this.priceFrom - this.minFinalPrice) /
        (this.maxFinalPrice - this.minFinalPrice)) *
      100;
    console.log(thumbWidth);
    
    this.thumbLeft.nativeElement.style.left = `calc(${percent}% - ${
      percent * (thumbWidth / 100)
    }px)`;

    this.range.nativeElement.style.left = percent + '%';
    if (this.priceFrom + 1 == this.priceTo) {
      this.thumbLeftInput.nativeElement.style.zIndex = 5;
    } else {
      this.thumbLeftInput.nativeElement.style.zIndex = 4;
    }
    if (type === 'change') {
      this.priceFromBSub.next(this.priceFrom);
    }
  }

  changeRightSlider(type: 'update' | 'change') {
    let thumbWidth = this.thumbRight.nativeElement.offsetWidth;
    this.thumbRightInput.nativeElement.value = this.priceTo = Math.max(
      this.priceTo,
      this.priceFrom + 1
    );
    const percent =
      ((this.priceTo - this.minFinalPrice) /
        (this.maxFinalPrice - this.minFinalPrice)) *
      100;
    this.thumbRight.nativeElement.style.right = `calc(${100 - percent}% - ${
      100 - percent
    }*${thumbWidth / 100}px)`;
    this.range.nativeElement.style.right = 100 - percent + '%';

    if (this.priceTo + 1 == this.priceFrom) {
      this.thumbRightInput.nativeElement.style.zIndex = 4;
    } else {
      this.thumbRight.nativeElement.style.zIndex = 5;
    }
    if (type === 'change') {
      this.priceToBSub.next(this.priceTo);
    }
  }
  changeSelectedOption(sltOption: SelectedCheckOption) {
    if (sltOption.name === 'discount') {
      if (sltOption.checked == false) {
        this.filterFormGroup.get('discount')?.reset();
      } else {
        this.filterFormGroup.get('discount')?.patchValue(sltOption.value);
      }
    } else if (sltOption.name === 'hotelFacilities') {
      let facilityOptionFound = this.filterFields[1].checkOptions?.find(
        (item) => item.value === sltOption.value
      );
      facilityOptionFound!.checked = sltOption.checked;
      const filters = this.filterFields[1].checkOptions
        ?.filter((option) => option.checked === true)
        .map((filter) => filter.value);
      this.filterFormGroup.get('hotelFacilities')?.patchValue(filters);
      const queryParams = { ...this._route.snapshot.queryParams };

      const joinedValues: string = filters!.join(',');
      queryParams['hotelFacilities'] = joinedValues;
      this._router.navigate([], {
        queryParams,
        replaceUrl: true,
      });
    } else if (sltOption.name === 'guestRating') {
      if (sltOption.checked == true) {
        this.filterFields[2].value = sltOption.value;
      } else {
        this.filterFields[2].value = '';
      }
    }
  }
  clearSelectedOption() {
    this.filterFormGroup.reset();
    this.selectedField.selectedCheckOptions.forEach((item) => {
      item.checked = false;
    });
    this.filterFields.forEach((field) => {
      if (field.type === 'radio') {
        field.value = '';
      } else if (field.type === 'checkbox') {
        field.checkOptions?.forEach((option) => (option.checked = false));
      }
    });
  }
}
