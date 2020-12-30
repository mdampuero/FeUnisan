import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  list: any[] = [];
  total:any;
  constructor() {
    this.loadStorage();
    this.calcTotal();
  }

  add(product: any) {
    this.list.push(product);
    this.saveStorage();
    return product.id;
  }

  get(id: string) {
    return this.list.find((listData) => listData.id === id);
  }

  clear() {
    this.list = [];
    this.saveStorage();
  }

  saveStorage() {
    this.calcTotal();
    localStorage.setItem("cart", JSON.stringify(this.list));
  }

  calcTotal() {
    this.total=0;
    this.list.forEach((myObject, index) => {
      this.total+=(myObject.price * myObject.quantity);
    });
    return this.total;
  }

  loadStorage() {
    if (JSON.parse(localStorage.getItem("cart")!)) {
      this.list = JSON.parse(localStorage.getItem("cart")!);
    }
  }

  update(item: { id: any; }) {
    this.list.forEach((myObject, index) => {
      if (myObject.id === item.id) {
        this.list[index] = item;
      }
      this.saveStorage();
      this.loadStorage();
    });
  }

  delete(item: { id: any; }) {
    this.list = this.list.filter((listData) => listData.id !== item.id);
    this.saveStorage();
  }
}
