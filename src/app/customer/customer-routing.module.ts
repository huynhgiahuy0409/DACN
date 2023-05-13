import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule)
      },
      {
        path: "checkout",
        loadChildren: () => import('./checkout/checkout.module').then((m) => m.CheckoutModule)
      },
      { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
      {
        path: "login",
        loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
      },
      {
        path: "register",
        loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule)
      },
      {
        path: "favorite-list",
        loadChildren: () => import('./favorite-list/favorite-list.module').then((m) => m.FavoriteListModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
