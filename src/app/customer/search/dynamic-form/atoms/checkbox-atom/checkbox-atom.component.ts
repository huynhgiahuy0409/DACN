import { Component, Input, OnInit } from '@angular/core';
import { FilterField } from '../../../components/side-bar-filter/side-bar-filter.component';

@Component({
  selector: 'app-checkbox-atom',
  templateUrl: './checkbox-atom.component.html',
  styleUrls: ['./checkbox-atom.component.scss']
})
export class CheckboxAtomComponent implements OnInit {
  @Input()
  field!: FilterField
  constructor() { }

  ngOnInit(): void {
  }

}
