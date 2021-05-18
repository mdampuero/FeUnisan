import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/db/login.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account-users',
  templateUrl: './account-users.component.html'
})
export class AccountUsersComponent implements OnInit {
  public failed=false;
  public open=false;
  public form:any={
    user:{
      name:'',
      email:'',
      phone:''
    }
  }
  public results: any[] = [];
  constructor(
    private apiService:ApiService,
    private loginService:LoginService,
    private spinner: NgxSpinnerService,
    public toastService: ToastService,
    private router: Router,) { 
      if(!this.loginService.user.id || this.loginService.user.role!='ROLE_CUSTOMER_SUPER') this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getUsers();
  }
  toggle(){
    this.open=!this.open;
  }
  save(form:NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }else{
      this.saveUser();
      return;
    }
  }

  deleteUser(userId:any){
    Swal.fire({
      text: '¿Está seguro que desea eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.apiService.deleteUser(userId).subscribe(
          (data:any) => {
            this.getUsers();
          },
          (error) => {
            this.spinner.hide();
          },
          () => {
            
          }
        );
      }
    })
  }

  getUsers(){
    this.spinner.show();
    this.apiService.getUsers().subscribe(
      (data:any) => {
        this.results = data["data"];
      },
      (error) => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  reset(){
    this.form.user.name='';
    this.form.user.phone='';
    this.form.user.email='';
  }

  saveUser(){
    this.failed=false;
    this.spinner.show();
    this.apiService.addUser(this.form.user).subscribe(
      (data:any) => {
        this.toastService.show('El usuario se creó correctamente y se le notificó al mismo para que valide su dirección de Email', {
          classname: 'bg-success text-light',
          delay: 5000 ,
          autohide: true,
        });
        this.open=false;
        this.getUsers();
        this.reset();
      },
      (error) => {
        this.failed=true;
        this.spinner.hide();
        this.toastService.show('Ocurrió un error al intentar crear el usuario, revise el formulario.', {
          classname: 'bg-danger text-light',
          delay: 5000 ,
          autohide: true,
        });
      },
      () => {
       
      }
    );
  }

}
