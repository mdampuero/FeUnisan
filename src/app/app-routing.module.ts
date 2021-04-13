import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/pages/cart/cart.component';
import { CotizationComponent } from './components/cotization/cotization.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { SalientsComponent } from './components/pages/salients/salients.component';
import { ProductComponent } from './components/pages/product/product.component';
import { ServicesComponent } from './components/services/services.component';
import { AccountComponent } from './components/pages/account/account.component';
import { AccountConveniosComponent } from './components/pages/account-convenios/account-convenios.component';
import { AccountConveniosViewComponent } from './components/pages/account-convenios-view/account-convenios-view.component';
import { AccountOrdersComponent } from './components/pages/account-orders/account-orders.component';
import { AccountOrdersViewComponent } from './components/pages/account-orders-view/account-orders-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'productos', component: ProductsComponent},
  { path: 'micuenta', component: AccountComponent},
  { path: 'convenios', component: AccountConveniosComponent},
  { path: 'convenios/:key', component: AccountConveniosViewComponent},
  { path: 'productos/destacados', component: SalientsComponent},
  { path: 'servicios', component: ServicesComponent},
  { path: 'solicitarCotizacion/:id', component: CotizationComponent},
  { path: 'carrito', component: CartComponent},
  { path: 'pedidos', component: AccountOrdersComponent},
  { path: 'pedidos/:id', component: AccountOrdersViewComponent},
  { path: 'producto/:id', component: ProductComponent},
  { path: '', pathMatch:'full', component: HomeComponent},
  { path: '**', pathMatch:'full', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
