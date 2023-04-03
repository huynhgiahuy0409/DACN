import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FilterField } from '../../components/side-bar-filter/side-bar-filter.component';

@Component({
  selector: 'app-field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.scss']
})
export class FieldBuilderComponent implements OnInit {
  @Input()
  field!: FilterField
  @Input()
  form!: FormGroup
  constructor() { }

  ngOnInit(): void {
  }

}
