import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FilterField } from '../../../components/side-bar-filter/side-bar-filter.component';

@Component({
  selector: 'app-checkbox-atom',
  templateUrl: './checkbox-atom.component.html',
  styleUrls: ['./checkbox-atom.component.scss']
})
export class CheckboxAtomComponent implements OnInit {
  @Input()
  field!: FilterField
  @Input()
  form!: FormGroup
  constructor(private __fb: FormBuilder) { }
  ngOnChanges(){
    this.form.addControl(this.field.name, this.__fb.control(''))
  }

  ngOnInit(): void {
  }
  updateChange(){
    const filters = this.field.checkOptions?.filter(option => option.checked === true).map(filter => filter.code)
    this.form.get(this.field.name)?.patchValue(filters)
  }
}
