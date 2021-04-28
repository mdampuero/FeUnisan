import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/db/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { PopupService } from 'src/app/services/db/popup.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  public forgot_failed=false;
  public form:any={
    forgot:{
      email:''
    }
  }
  constructor(
    private apiService:ApiService,
    private loginService:LoginService,
    private popupService:PopupService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public toastService: ToastService
    ) { 
      
    }

  ngOnInit(): void {
    console.log(this.popupService.getBySection('609e30c7-6aee-11eb-80e9-0242ac130002'));
  }

  save(form:NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }else{
      this.sendEmail();
      return;
    }
  }

  sendEmail(){
    this.forgot_failed=false;
    this.spinner.show();
    this.apiService.forgotPassword(this.form.forgot).subscribe(
      (data:any) => {
        this.spinner.hide();
        this.toastService.show('Se envió a tu Email los pasos a seguir para blanquear tu contraseña', {
          classname: 'bg-success text-light',
          delay: 5000 ,
          autohide: true,
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.spinner.hide();
        this.forgot_failed=true;
      },
      () => {
        this.spinner.hide();
      }
    );
    
  }
}
