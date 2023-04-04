import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    PhotosComponent
  ],
    imports: [
        CommonModule,
        PhotosRoutingModule,
        MatIconModule
    ]
})
export class PhotosModule { }
