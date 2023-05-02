import { Component } from '@angular/core';
import { ProgressSpinnerService } from './customer/services/progress-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dacn';
  constructor(public progressSpinnerService: ProgressSpinnerService){}
}
