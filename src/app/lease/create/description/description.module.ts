import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescriptionRoutingModule } from './description-routing.module';
import { DescriptionComponent } from './description.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DescriptionComponent
  ],
    imports: [
        CommonModule,
        DescriptionRoutingModule,
        ReactiveFormsModule
    ]
})
export class DescriptionModule { }
