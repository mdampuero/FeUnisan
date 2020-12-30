import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'carrito', component: CartComponent},
  { path: 'pago', component: CheckoutComponent},
  { path: 'mispedidos', component: OrdersComponent},
  { path: 'mispedidos/:id', component: OrderComponent},
  { path: 'producto/:id', component: ProductComponent},
  { path: '', pathMatch:'full', component: HomeComponent},
  { path: '**', pathMatch:'full', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
