import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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

  login(username: string, password: string) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}login`, {
      username: username,
      password: password,
    });
  }
  
  checkCustomer(email: string) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}customers_check`, {
      email: email
    });
  }

  saveCustomer(email: string) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}customers`, {
      email: email
    });
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

  getOrders() {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}customers/${this.loginService.user.id}/orders?start=${this.offset}&length=${this.limit}`
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
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
