import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { NavbarComponent } from './components/utils/navbar/navbar.component';

import { HttpClientModule} from '@angular/common/http';
import { CardProductComponent } from './components/utils/card-product/card-product.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/utils/toast/toast.component';
import { ModalProductComponent } from './components/utils/modal-product/modal-product.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { ServicesComponent } from './components/services/services.component';
import { CardServiceComponent } from './components/utils/card-service/card-service.component';
import { CotizationComponent } from './components/cotization/cotization.component';
import { FooterComponent } from './components/utils/footer/footer.component';
import { ContactComponent } from './components/utils/contact/contact.component';
import { BoxProductSalientComponent } from './components/utils/box-product-salient/box-product-salient.component';
import { AboutusComponent } from './components/utils/aboutus/aboutus.component';
import { CallToActionComponent } from './components/utils/call-to-action/call-to-action.component';
import { ServiceComponent } from './components/utils/service/service.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { SalientsComponent } from './components/pages/salients/salients.component';
// import { NlbrPipe } from './pipes/nlbr.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    NavbarComponent,
    CardProductComponent,
    ToastComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
    OrderComponent,
    LoginComponent,
    ServicesComponent,
    CardServiceComponent,
    CotizationComponent,
    FooterComponent,
    ContactComponent,
    BoxProductSalientComponent,
    AboutusComponent,
    CallToActionComponent,
    ServiceComponent,
    ProductsComponent,
    SalientsComponent,
    // NlbrPipe
  ],
  entryComponents:[
    ModalProductComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgxSpinnerModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  // exports: [ NlbrPipe ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
