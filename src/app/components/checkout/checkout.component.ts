import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/db/cart.service';
import { LoginService } from 'src/app/services/db/login.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})

export class CheckoutComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private apiService:ApiService,
    public cartService:CartService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public toastService: ToastService
    ) { 
      if(!this.loginService.user.id) this.router.navigate(['/login']);
    }

  ngOnInit(): void {
    
  }

  pay(){
    
    this.spinner.show();
    this.apiService.sendOrder(this.cartService).subscribe(
      (data:any) => {
        this.spinner.hide();
        this.apiService.sendEmail(data.id);
        Swal.fire(
          {
            title: '¡Pedido enviado!',
            text: 'Nº de pedido: #'+data.id,
            icon: 'success',
            allowOutsideClick: false,
            confirmButtonText: 'Aceptar'
          }
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/mispedidos']);
          }
        })
        this.cartService.clear();
      },
      (error) => {
        this.spinner.hide();
      },
      () => {
        //this.spinner.hide();
      }
    );
  }

}
