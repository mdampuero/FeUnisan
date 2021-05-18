import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from '../../../services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from "src/environments/environment";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotization',
  templateUrl: './cotization.component.html'
})
export class CotizationComponent implements OnInit {

  public productId:any;
  public data:any;
  public itemCart:any;
  public cotization_failed=false;
  public ready:boolean = false;
  public environment:any=environment;
  public categorySelected:any;
  public modelId:any;

  public form:any={
    cotization:{
      name:'',
      company:'',
      email:'',
      phone:'+569',
      modelName:'',
      model:'',
      observation:'',
      comercialAddressCity: "",
      comercialAddressNumber: "",
      comercialAddressStreet: "",
      serviceAddressCity: "",
      serviceAddressNumber: "",
      serviceAddressStreet: "",
      rut:"",
      frequency:""
    }
  }
  constructor(
    private route: ActivatedRoute,
    private apiService:ApiService,
    private router: Router,
    public toastService: ToastService,
    private spinner: NgxSpinnerService
  ) { 
    this.modelId=this.route.snapshot.paramMap.get("key");
    this.categorySelected=this.route.snapshot.paramMap.get("category");
  }

  ngOnInit(): void {
    this.spinner.show();
    this.apiService.getModel(this.modelId).subscribe(
      (data:any) => {
        this.data=data;
        this.form.cotization.modelName=data.name
        this.form.cotization.model=data.id
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

  save(form:NgForm){
    if(form.invalid){
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }else{
      this.spinner.show();
      this.apiService.sendRequest(this.form.cotization).subscribe(
        (data:any) => {
          this.spinner.hide();
          Swal.fire(
            {
              title: '¡Solicitud enviada!',
              text: 'Muchas gracias, a la brevedad nos comunicaremos contigo.',
              icon: 'success',
              allowOutsideClick: false,
              confirmButtonText: 'Aceptar'
            }
          ).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/servicios/'+this.data.id]);
            }
          })
        },
        (error) => {
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
      return;
    }
  }
}
