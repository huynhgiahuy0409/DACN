import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptionComponent } from './description.component';
import {LocationComponent} from "../location/location.component";

const routes: Routes = [{ path: '', component: DescriptionComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DescriptionRoutingModule { }
