import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FilterField } from '../../../components/side-bar-filter/side-bar-filter.component';

@Component({
  selector: 'app-radio-atom',
  templateUrl: './radio-atom.component.html',
  styleUrls: ['./radio-atom.component.scss']
})
export class RadioAtomComponent implements OnInit{
  @Input()
  field!: FilterField
  @Input()
  form!: FormGroup
  constructor(private __fb: FormBuilder) {
    console.log(this.form);
    
  }
  ngOnChanges(){
    this.form.addControl(this.field.name, this.__fb.control(''))
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
  }

}
