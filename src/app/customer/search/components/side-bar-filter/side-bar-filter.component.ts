import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  validation?: any;
  radioOptions?: RadioOption[];
  checkOptions?: CheckBoxOption[];
}
@Component({
  selector: 'app-side-bar-filter',
  templateUrl: './side-bar-filter.component.html',
  styleUrls: ['./side-bar-filter.component.scss'],
})
export class SideBarFilterComponent implements OnInit {
  filterFields: FilterField[] = [
    {
      type: 'checkbox',
      name: 'propertyType',
      label: 'Hình thức',
      checkOptions: [],
    },
    {
      type: 'checkbox',
      name: 'startRating',
      label: 'Đánh giá sao',
      checkOptions: [],
    },
    {
      type: 'radio',
      name: 'guestRating',
      label: 'Khách đánh giá',
      value: '',
      radioOptions: [],
    },
  ];
  filterFormGroup!: FormGroup;
  constructor(private __fb: FormBuilder) {
    this.filterFormGroup = this.__fb.group({
      propertyType: this.__fb.array([]),
      startRating: this.__fb.array([]),
      guestRating: '',
    });
  }
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
