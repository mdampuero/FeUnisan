import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/db/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: [
  ]
})
export class AccountComponent implements OnInit {
  public account_failed='';
  public form:any={
    account:{
      id:'',
      name:'',
      email:'',
      phone:'',
      provence:'',
      city:'',
      address:'',
    }
  }
  constructor(
    private loginService:LoginService,
    private apiService:ApiService,
    private spinner: NgxSpinnerService,
    public toastService: ToastService,
    private router: Router) { 
    if(!this.loginService.user.id) this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.loadData();
  }

  save(form:NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }else{
      this.spinner.show();
      this.apiService.editProfile(this.form.account).subscribe(
        (data:any) => {
          this.loginService.login(data);
          this.spinner.hide();
          this.toastService.show('Los datos fueron actualizados correctamente.', {
            classname: 'bg-success text-light',
            delay: 5000 ,
            autohide: true,
          });
        },
        (error) => {
          this.account_failed='sss';
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
      return;
    }
  }

  loadData(){
    this.form.account.id=this.loginService.user.id;
    this.form.account.name=this.loginService.user.name;
    this.form.account.email=this.loginService.user.email;
    this.form.account.phone=this.loginService.user.phone;
    this.form.account.provence=this.loginService.user.provence;
    this.form.account.city=this.loginService.user.city;
    this.form.account.address=this.loginService.user.address;
  }

}
