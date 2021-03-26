import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from './../../services/toast.service';
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
  public ready:boolean = false;
  public environment:any=environment;
  public name='';
  public phone='';
  public email='';
  public observation='';
  constructor(
    private route: ActivatedRoute,
    private apiService:ApiService,
    private router: Router,
    public toastService: ToastService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.apiService.getService(this.route.snapshot.paramMap.get("id")).subscribe(
      (data:any) => {
        this.data=data;
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

  request(){
    this.spinner.show();
    this.apiService.sendRequest(
      { clientName: this.name, 
        clientEmail: this.email,
        clientPhone:this.phone, 
        observation:this.observation, 
        service:this.route.snapshot.paramMap.get("id") 
      }).subscribe(
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
            this.router.navigate(['/servicios']);
          }
        })
      },
      (error) => {
        this.toastService.show('Debe completar todos los campos con *', {
          classname: 'bg-danger text-light',
          delay: 2000 ,
          autohide: true,
        });
        this.spinner.hide();
      },
      () => {
        //this.spinner.hide();
      }
    );
  }
}
