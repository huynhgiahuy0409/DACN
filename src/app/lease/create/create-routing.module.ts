import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateComponent} from './create.component';
import {BasicComponent} from "./basic/basic.component";

const routes: Routes = [{path: '', component: CreateComponent, children: [
    {path: 'basic', loadChildren: () => import('./basic/basic.module').then(m => m.BasicModule)},
    {path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationModule)},
    {path: '', redirectTo:'basic',pathMatch:'full'}
  ]},







];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule {
}
