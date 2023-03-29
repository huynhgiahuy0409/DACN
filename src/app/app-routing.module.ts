import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'lease',
    loadChildren: () =>
      import('./lease/lease.module').then((m) => m.LeaseModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
