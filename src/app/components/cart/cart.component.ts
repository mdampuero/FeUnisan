import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/db/cart.service';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  constructor(
    private loginService:LoginService,
    private router: Router,
    public cartService:CartService) {
      if(!this.loginService.user.id) this.router.navigate(['/login']);
     }

  ngOnInit(): void {
  }

}
