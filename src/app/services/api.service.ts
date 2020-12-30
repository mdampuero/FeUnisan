import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Product } from '../models/product.model';
import { LoginService } from './db/login.service';

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
    ) { 
    console.log("Service api ready");
  }

  searchProduct(query: string) {
    return this.http
      .get(
        `${environment.baseUrl}${environment.apiUrl}products?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`
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

  login(username: string, password: string) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}login`, {
      username: username,
      password: password,
    });
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
  
  sendOrder(cartService: { total: any; list: any; }) {
    return this.http.post(`${environment.baseUrl}${environment.apiUrl}orders`, {
      channel: "WEB",
      total: cartService.total,
      customer: this.loginService.user.id,
      items: cartService.list,
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
