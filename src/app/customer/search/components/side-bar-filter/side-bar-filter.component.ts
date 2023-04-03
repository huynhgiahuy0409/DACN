import { KeyValue } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, Observable, of, take, timeout } from 'rxjs';
import { OptionResponse } from 'src/app/models/response';
interface RadioOption {
  label: string;
  code: string;
}
interface CheckBoxOption {
  checked: boolean;
  label: string;
  code: string;
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
@Component({
  selector: 'app-side-bar-filter',
  templateUrl: './side-bar-filter.component.html',
  styleUrls: ['./side-bar-filter.component.scss'],
})
export class SideBarFilterComponent implements OnInit, OnChanges {
  filterFields: FilterField[] = [
    {
      type: 'checkbox',
      name: 'propertyType',
      label: 'Hình thức',
      checkOptions: [],
      color: 'primary',
    },
    {
      type: 'checkbox',
      name: 'startRating',
      label: 'Đánh giá sao',
      checkOptions: [],
      color: 'primary',
    },
    {
      type: 'radio',
      name: 'guestRating',
      label: 'Khách đánh giá',
      value: '',
      radioOptions: [],
      color: 'primary',
    },
  ];
  filterFormGroup!: FormGroup;
  constructor(private __fb: FormBuilder) {
    this.filterFormGroup = this.__fb.group({});
    this.filterFormGroup.valueChanges.subscribe((value) => console.log(value));
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {
    let obsA$: Observable<OptionResponse[]> = of([
      {
        label: 'Fish',
        code: 'f',
      },
      {
        label: 'Big',
        code: 'b',
      },
    ]);
    let obsC$: Observable<OptionResponse[]> = of([
      {
        label: 'Check A',
        code: 'a',
      },
      {
        label: 'Check B',
        code: 'b',
      },
    ]);

    forkJoin([obsA$, obsC$]).subscribe((result) => {
      let radioOptionsA: OptionResponse[] = result[0];
      let checkOptionsB: OptionResponse[] = result[1];
      this.filterFields[0].checkOptions = checkOptionsB.map(
        (option: OptionResponse) => {
          return {
            ...option,
            checked: false,
          };
        }
      );
      this.filterFields[1].checkOptions = checkOptionsB.map(
        (option: OptionResponse) => {
          return {
            ...option,
            checked: false,
          };
        }
      );
      this.filterFields[2].radioOptions = radioOptionsA.map(
        (option: OptionResponse) => {
          return {
            ...option,
          };
        }
      );
      console.log(this.filterFields);
    });
  }
}
