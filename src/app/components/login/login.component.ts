import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/db/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { PopupService } from 'src/app/services/db/popup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public email:any='';
  public password:any='';
  constructor(
    private apiService:ApiService,
    private loginService:LoginService,
    private popupService:PopupService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public toastService: ToastService
    ) { 
      if(this.loginService.user.id) this.router.navigate(['/inicio']);
    }

  ngOnInit(): void {
    console.log(this.popupService.getBySection('609e30c7-6aee-11eb-80e9-0242ac130002'));
  }

  login(){
    this.spinner.show();
    this.apiService.login(this.email,this.password).subscribe(
      (data:any) => {
        this.spinner.hide();
        this.loginService.login(data);
        this.router.navigate(['']);
      },
      (error) => {
        this.spinner.hide();
        this.toastService.show('Email o contraseña incorrectos', {
          classname: 'bg-danger text-light',
          delay: 3000 ,
          autohide: true,
        });
      },
      () => {
        this.spinner.hide();
      }
    );
    
  }
}
