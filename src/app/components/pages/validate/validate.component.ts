import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html'
})
export class ValidateComponent implements OnInit {

  public id:String | null;
  public code:String | null;
  public reset_failed=false;
  public locked=false;
  public form:any={
    reset:{
      password1:'',
      password2:''
    }
  }
  constructor(
    private apiService:ApiService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToastService
    ) { 
      this.id=this.route.snapshot.paramMap.get("id");
      this.code=this.route.snapshot.paramMap.get("code");
    }

  ngOnInit(): void {
    // console.log(this.popupService.getBySection('609e30c7-6aee-11eb-80e9-0242ac130002'));
    this.checkCode();
  }

  save(form:NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }else{
      this.reset();
      return;
    }
  }

  checkCode(){
    this.spinner.show();
    this.apiService.checkCode(this.id,this.code).subscribe(
      (data:any) => {
        this.spinner.hide();
        console.log(data);
      },
      (error) => {
        this.spinner.hide();
        this.locked=true;
      },
      () => {
        this.spinner.hide();
      }
    );
    
  }
  reset(){
    this.reset_failed=false;
    this.spinner.show();
    this.apiService.validate(this.form.reset,this.id,this.code).subscribe(
      (data:any) => {
        this.spinner.hide();
        this.toastService.show('Su cuenta se ha validado correctamente, ya puede ingresar a nuestro sistema', {
          classname: 'bg-success text-light',
          delay: 5000 ,
          autohide: true,
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        this.spinner.hide();
        this.reset_failed=true;
      },
      () => {
        this.spinner.hide();
      }
    );
    
  }
}
