import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/db/cart.service';
import { ToastService } from './../../services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {
  public productId:any;
  public data:any;
  public itemCart:any;
  public ready:boolean = false;
  public environment:any=environment;
  constructor(
    private route: ActivatedRoute,
    private api:ApiService,
    private cartService:CartService,
    public toastService: ToastService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.api.getProduct(this.route.snapshot.paramMap.get("id")).subscribe(
      (data:any) => {
        this.itemCart = this.cartService.list.find(
          (listData) => listData.id === data.id
        );
        if (this.itemCart) {
          data.quantity = this.itemCart.quantity;
        }else{
          data.quantity=0;
        }
        this.data=data;
        this.subtotal();
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.ready=true;
        this.spinner.hide();
      }
    );
  }

  btnPlus(){
    this.data.quantity++;
  }

  btnMinus(){
    if(this.data.quantity>0){
      this.data.quantity--;
    }
  }

  addCart(){
    if(this.data.quantity>0){
      if(this.itemCart){
        this.cartService.update(this.data);
        this.toastService.show('Carrito actualizado', {
          classname: 'bg-success text-light',
          delay: 2000 ,
          autohide: true,
        });
      }else{
        this.itemCart=this.data;
        this.cartService.add(this.data);
        this.toastService.show('Producto agregado al carrito', {
          classname: 'bg-success text-light',
          delay: 2000 ,
          autohide: true,
        });
      }
    }else if(this.data.quantity==0){
      this.itemCart=null;
      this.cartService.delete(this.data);
      this.toastService.show('Producto eliminado del carrito', {
        classname: 'bg-warning text-light',
        delay: 2000 ,
        autohide: true,
      });
    }
  }

  subtotal(){
    this.data.subtotal=this.data.price*this.data.quantity;
  }
}
