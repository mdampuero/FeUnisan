import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CotizationComponent } from './components/cotization/cotization.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { SalientsComponent } from './components/pages/salients/salients.component';
import { ProductComponent } from './components/product/product.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'productos', component: ProductsComponent},
  { path: 'productos/destacados', component: SalientsComponent},
  { path: 'servicios', component: ServicesComponent},
  { path: 'solicitarCotizacion/:id', component: CotizationComponent},
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
