import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FilterField,
  RadioOption,
  SelectedField,
  SelectedCheckOption,
} from '../../../components/side-bar-filter/side-bar-filter.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-radio-atom',
  templateUrl: './radio-atom.component.html',
  styleUrls: ['./radio-atom.component.scss'],
})
export class RadioAtomComponent implements OnInit, OnChanges {
  @Input()
  field!: FilterField;
  @Input()
  form!: FormGroup;
  @Input()
  selectedField!: SelectedField;
  constructor(
    private __fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.form.contains(this.field.name)) {
      this.form.addControl(this.field.name, this.__fb.control(''));
    }
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {}
  selectRadio(radio: RadioOption) {
    let {label, value} = radio
    if(this.field.name === 'guestRating'){
      label = "Người dùng đánh giá: " + label
    }
    let selectedCheckOption: SelectedCheckOption | undefined =
      this.selectedField.selectedCheckOptions.find(
        (sltRadioOption) => sltRadioOption.name == this.field.name 
      );
    console.log(selectedCheckOption != null);
    console.log(selectedCheckOption != undefined);
    
    if (selectedCheckOption) {
      selectedCheckOption.value = value;
      selectedCheckOption.label = label;
      selectedCheckOption.checked = true;
    } else {
      selectedCheckOption = {
        name: this.field.name,
        checked: true,
        label: label,
        value: value,
      };
      this.selectedField.selectedCheckOptions.unshift(selectedCheckOption);
    }

    const queryParams = { ...this._route.snapshot.queryParams };
    queryParams[this.field.name] = value;

    this._router.navigate([], {
      queryParams,
      replaceUrl: true,
      queryParamsHandling: 'merge',
    });
  }
}
