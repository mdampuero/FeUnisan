import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root",
})
export class ProductService {
  public product: any;
  constructor() {
    this.loadStorage();
  }
  save(product: any) {
    this.product = product;
    this.saveStorage();
  }
  loadStorage() {
    if (JSON.parse(localStorage.getItem("product")!)) {
      this.product = JSON.parse(localStorage.getItem("product")!);
    }
  }
  saveStorage() {
    localStorage.setItem("product", JSON.stringify(this.product));
  }
}
