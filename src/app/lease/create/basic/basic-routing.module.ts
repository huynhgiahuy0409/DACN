import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './basic.component';
import {LocationComponent} from "../location/location.component";

const routes: Routes = [{ path: '', component: BasicComponent },
  { path: 'location', component: LocationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasicRoutingModule { }
