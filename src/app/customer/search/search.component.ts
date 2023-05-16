import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductFilterRequest } from 'src/app/models/request';
import { switchMap } from 'rxjs';
import { FilterProductService } from '../services/filter-product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("search init");
  }

}
