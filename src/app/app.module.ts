import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ProductComponent } from './components/pages/product/product.component';
import { NavbarComponent } from './components/utils/navbar/navbar.component';

import { HttpClientModule} from '@angular/common/http';
import { CardProductComponent } from './components/utils/card-product/card-product.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './components/utils/toast/toast.component';
import { ModalProductComponent } from './components/utils/modal-product/modal-product.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './components/pages/cart/cart.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './components/pages/login/login.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { CardServiceComponent } from './components/utils/card-service/card-service.component';
import { CotizationComponent } from './components/pages/cotization/cotization.component';
import { FooterComponent } from './components/utils/footer/footer.component';
import { ContactComponent } from './components/utils/contact/contact.component';
import { BoxProductSalientComponent } from './components/utils/box-product-salient/box-product-salient.component';
import { AboutusComponent } from './components/utils/aboutus/aboutus.component';
import { CallToActionComponent } from './components/utils/call-to-action/call-to-action.component';
import { ServiceComponent } from './components/utils/service/service.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { SalientsComponent } from './components/pages/salients/salients.component';
import { AccountComponent } from './components/pages/account/account.component';
import { MenuComponent } from './components/utils/menu/menu.component';
import { AccountCardsComponent } from './components/utils/account-cards/account-cards.component';
import { AccountConveniosComponent } from './components/pages/account-convenios/account-convenios.component';
import { AccountConveniosViewComponent } from './components/pages/account-convenios-view/account-convenios-view.component';
import { AccountOrdersComponent } from './components/pages/account-orders/account-orders.component';
import { AccountOrdersViewComponent } from './components/pages/account-orders-view/account-orders-view.component';
import { ForgotPasswordComponent } from './components/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/pages/reset-password/reset-password.component';
import { ServiceDetailComponent } from './components/pages/service-detail/service-detail.component';
import { CardServiceUnitComponent } from './components/utils/card-service-unit/card-service-unit.component';
import { CarouselComponent } from './components/utils/carousel/carousel.component';
import { PopupsComponent } from './components/utils/popups/popups.component';
import { NoResultsComponent } from './components/utils/no-results/no-results.component';
import { CardModelUnitComponent } from './components/utils/card-model-unit/card-model-unit.component';
import { ValidateComponent } from './components/pages/validate/validate.component';
import { AccountUsersComponent } from './components/pages/account-users/account-users.component';
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
    AccountComponent,
    MenuComponent,
    AccountCardsComponent,
    AccountConveniosComponent,
    AccountConveniosViewComponent,
    AccountOrdersComponent,
    AccountOrdersViewComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ServiceDetailComponent,
    CardServiceUnitComponent,
    CarouselComponent,
    PopupsComponent,
    NoResultsComponent,
    CardModelUnitComponent,
    ValidateComponent,
    AccountUsersComponent,
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
