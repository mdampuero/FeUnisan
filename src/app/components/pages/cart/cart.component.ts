import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/db/cart.service';
import { LoginService } from 'src/app/services/db/login.service';
import { PopupService } from 'src/app/services/db/popup.service';
import { ToastService } from 'src/app/services/toast.service';
import { ModalProductComponent } from '../../utils/modal-product/modal-product.component';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { environment } from "src/environments/environment";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  public step = 1;
  public customer:any;
  public environment:any=environment;
  public form:any={
    step2:{
      email:''
    },
    step3:{
      name:'',
      document:'',
      city:'',
      address:'',
      provence:'',
      phone:'',
      role:''
    },
    step4:{

    }
  }
  constructor(
    private loginService:LoginService,
    private router: Router,
    private apiService:ApiService,
    private spinner: NgxSpinnerService,
    private popupService:PopupService,
    private modalService: NgbModal,
    public toastService: ToastService,
    public cartService:CartService) {
    }

  ngOnInit(): void {
    
  }


  nextStep(){
    this.step++;
  }
  
  previusStep(){
    this.step--;
  }

  save(form:NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }else{
      if(this.step==2){
        this.getCustomer();
        return;
      }
      if(this.step==3){
        this.editCustomer();
        return;
      }
      if(this.step==4){
        this.pay();
        return;
      }
      this.step++;
      return;
    }
  }

  goToStep(step:any){
    if(step<this.step)
      this.step=step;
  }

  getCustomer(){
    this.spinner.show();
    this.apiService.checkCustomer(this.form.step2.email).subscribe(
      (data:any) => {
        this.spinner.hide();
        this.setCustomer(data);
      },
      (error) => {
        if(error.status == 404 ){
          this.saveCustomer();
        }
      },
      () => {
      }
    );
  }

  saveCustomer(){
    this.apiService.saveCustomer(this.form.step2.email).subscribe(
      (data:any) => {
        this.spinner.hide();
        this.setCustomer(data);
      },
      (error) => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  editCustomer(){
    this.spinner.show();
    this.customer.name=this.form.step3.name;
    this.customer.document=this.form.step3.document;
    this.customer.address=this.form.step3.address;
    this.customer.city=this.form.step3.city;
    this.customer.provence=this.form.step3.provence;
    this.customer.phone=this.form.step3.phone;
    this.customer.role=this.form.step3.role;
    
    this.apiService.editCustomer(this.customer).subscribe(
      (data:any) => {
        this.spinner.hide();
        this.setCustomer(data);
      },
      (error) => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  setCustomer(data:any){
    this.customer=data;
    this.step++;
    this.form.step3.name=this.customer.name;
    this.form.step3.document=this.customer.document;
    this.form.step3.address=this.customer.address;
    this.form.step3.city=this.customer.city;
    this.form.step3.provence=this.customer.provence;
    this.form.step3.phone=this.customer.phone;
    this.form.step3.role=this.customer.role;
  }

  pay(){
    
    this.spinner.show();
    this.apiService.sendOrder(this.cartService,this.customer).subscribe(
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
            this.router.navigate(['/home']);
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
