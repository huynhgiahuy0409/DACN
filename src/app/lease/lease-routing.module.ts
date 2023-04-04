import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LeaseComponent} from './lease.component';



const routes: Routes = [
  {
    path: '',
    component: LeaseComponent,
    children: [
        {path: 'create', loadChildren: () => import('./create/create.module').then(m => m.CreateModule)},


    ],
  },




];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseRoutingModule {
}
