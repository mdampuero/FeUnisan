import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './components/pages/cart/cart.component';
import { CotizationComponent } from './components/pages/cotization/cotization.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { SalientsComponent } from './components/pages/salients/salients.component';
import { ProductComponent } from './components/pages/product/product.component';
import { AccountComponent } from './components/pages/account/account.component';
import { AccountConveniosComponent } from './components/pages/account-convenios/account-convenios.component';
import { AccountConveniosViewComponent } from './components/pages/account-convenios-view/account-convenios-view.component';
import { AccountOrdersComponent } from './components/pages/account-orders/account-orders.component';
import { AccountOrdersViewComponent } from './components/pages/account-orders-view/account-orders-view.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { ServiceDetailComponent } from './components/pages/service-detail/service-detail.component';
import { ValidateComponent } from './components/pages/validate/validate.component';
import { AccountUsersComponent } from './components/pages/account-users/account-users.component';
import { AccountContratosComponent } from './components/pages/account-contratos/account-contratos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'olvideMiContrasena', component: ForgotPasswordComponent},
  { path: 'blanquearMiContrasena/:id/:code', component: ResetPasswordComponent},
  { path: 'validarCuenta/:id/:code', component: ValidateComponent},
  { path: 'productos', component: ProductsComponent},
  { path: 'servicios/:category/:key', component: ServicesComponent},
  { path: 'servicio/:category/:key', component: ServiceDetailComponent},
  { path: 'misdatos', component: AccountComponent},
  { path: 'convenios', component: AccountConveniosComponent},
  { path: 'contratos', component: AccountContratosComponent},
  { path: 'usuarios', component: AccountUsersComponent},
  { path: 'convenios/:key', component: AccountConveniosViewComponent},
  { path: 'productos/destacados', component: SalientsComponent},
  { path: 'solicitarCotizacion/:category/:key', component: CotizationComponent},
  { path: 'carrito', component: CartComponent},
  { path: 'pedidos', component: AccountOrdersComponent},
  { path: 'pedidos/:id', component: AccountOrdersViewComponent},
  { path: 'producto/:id', component: ProductComponent},
  { path: '', pathMatch:'full', component: HomeComponent},
  { path: '**', pathMatch:'full', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled',onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
