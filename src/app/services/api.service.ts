import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Product } from '../models/product.model';
import { LoginService } from './db/login.service';
import { PopupService } from './db/popup.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public limit = 30;
  public offset = 0;
  public sort = "name";
  public direction = "DESC";
  constructor(
    private http: HttpClient,
    private loginService:LoginService,
    private popupService:PopupService,
    ) { 
    
  }

  searchProduct(query: string,category:any) {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}products?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}&category=${category.id}`
      )
      .pipe(
        map((data:any) => {
          const results: Product[] = [];
          data["data"].forEach((myObject: any, index: any) => {
            myObject.quantity=0;
            myObject.subtotal=0;
            results.push(myObject);
          });
          let response = {
            results: results,
            recordsFiltered: data["recordsFiltered"],
            recordsTotal: data["recordsTotal"],
            offset: data["offset"],
            limit: data["limit"],
          };
          return response;
        })
      );
  }

  productsSalient() {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}products_salients`
      )
      .pipe(
        map((data:any) => {
          return data;
        })
      );
  }

  convenios(query:any) {
    return this.http
      .post(
        `${environment.baseUrl}${environment.apiUrl}convenios`,
        { query }
      )
      .pipe(
        map((data:any) => {
          return data;
        })
      );
  }
  
  contratos(query:any) {
    return this.http
      .post(
        `${environment.baseUrl}${environment.apiUrl}contratosByRut`,
        { query }
      )
      .pipe(
        map((data:any) => {
          return data;
        })
      );
  }
  
  services(query: string) {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}services?search%5Bvalue%5D=${query}&start=${this.offset}&length=100&sort=${this.sort}&direction=${this.direction}`
      )
      .pipe(
        map((data:any) => {
          return data;
        })
      );
  }
  
  models(query: string) {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}modelsByGroup`
      )
      .pipe(
        map((data:any) => {
          return data;
        })
      );
  }
  
  filters(query: string) {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}filtersByGroup`
      )
      .pipe(
        map((data:any) => {
          return data;
        })
      );
  }
  
  getCategories() {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}categories?search%5Bvalue%5D=&start=${this.offset}&length=100&sort=${this.sort}&direction=${this.direction}`
      )
      .pipe(
        map((data:any) => {
          return data;
        })
      );
  }
  
  getCategoriesService() {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}service_categories?search%5Bvalue%5D=&start=${this.offset}&length=100&sort=${this.sort}&direction=${this.direction}`
      )
      .pipe(
        map((data:any) => {
          return data;
        })
      );
  }

  getProduct(productId: any){
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}products/${productId}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  getService(serviceId: any){
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}services/${serviceId}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  getModel(id: any){
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}models/${id}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  
  servicesGetById(serviceId: any,category:any){
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}servicesByCategory/${serviceId}/${category}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  login(form: any) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}login`, {
      username: form.email,
      password: form.password
    });
  }
  
  forgotPassword(form: any) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}forgot_password`, {
      email: form.email,
      resetUrl: environment.url+'/blanquearMiContrasena'
    });
  }

  checkCode(id: String | null,code: String | null) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}check_code`, {
      id:id,
      code:code
    });
  }
  
  resetPassword(form: any,id: String | null,code: String | null) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}reset_password`, {
      password: form.password1,
      id:id,
      code:code
    });
  }
  
  validate(form: any,id: String | null,code: String | null) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}customersValidateConfirm`, {
      password: form.password1,
      id:id,
      code:code
    });
  }
  
  checkCustomer(email: string) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}customers_check`, {
      email: email
    });
  }

  saveCustomer(email: string) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}customersByEmail`, {
      email: email
    });
  }

  editProfile(customer: any) {
    return this.http.put(`${environment.baseUrl}${environment.apiUrl}customersProfile/${customer.id}`, customer);
  }
  
  editCustomer(customer: any) {
    return this.http.put(`${environment.baseUrl}${environment.apiUrl}customers/${customer.id}`, customer);
  }
  
  getOrder(orderId: any){
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}orders/${orderId}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  
  sendOrder(cartService: { total: any; list: any; },customer:any) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}orders`, {
      channel: "WEB",
      total: cartService.total,
      customer: customer.id,
      items: cartService.list,
    });
  }

  sendRequest(data: { clientName: string; clientEmail: string; clientPhone: string; observation:string, service: string | null; }) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}cotizations`, data);
  }

  visit() {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}visits`, {
      
    });
  }
  
  deleteUser(userId:any) {
    return this.http.delete(`${environment.baseUrl}${environment.apiUrl}customers/${userId}`, {
      
    });
  }

  getOrders(status:any,id:any) {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}customers/${this.loginService.user.id}/orders?start=${this.offset}&length=${this.limit}&status=${status}&id=${id}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  
  getUsers() {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}customersOperators/${this.loginService.user.id}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }
  addUser(data:any) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}customersOperators/${this.loginService.user.id}`, data);
  }
  
  getPopup() {
    return this.http
      .get(`${environment.baseUrl}${environment.apiUrl}popups_active`, {})
      .subscribe(
        (data) => {
          this.popupService.saveStorage(data);
        },
        (error) => {},
        () => {}
      );
  }

  sendEmail(orderId: any) {
    return this.http
      .get(`${environment.baseUrl}${environment.apiUrl}orders/email/${orderId}`, {})
      .subscribe(
        (data) => {},
        (error) => {},
        () => {}
      );
  }
}
