import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/db/cart.service';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(
    public loginService:LoginService,
    public cartService:CartService,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  login(){
    this.router.navigate(['/login']);
  }
}
