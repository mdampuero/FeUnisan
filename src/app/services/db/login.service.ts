import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user = {
    id: null,
    name: null,
    email: null,
    phone: null,
    provence: null,
    city: null,
    address: null,
    document: null,
  };
  constructor() {
    this.loadStorage();
  }
  login(user:any) {
    this.user = user;
    this.saveStorage();
  }
  loadStorage() {
    if (JSON.parse(localStorage.getItem("user")!)) {
      this.user = JSON.parse(localStorage.getItem("user")!);
    }
  }
  saveStorage() {
    localStorage.setItem("user", JSON.stringify(this.user));
  }
  logout() {
    this.user = {
      id: null,
      name: null,
      email: null,
      phone: null,
      provence: null,
      city: null,
      address: null,
      document: null,
    };
    this.saveStorage();
  }
}
