import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styles: [
  ]
})
export class AccountOrdersComponent implements OnInit {
  public status:any[]=[
    { id: '', name:'' },
    { id: 'ENTERED', name:'Ingresado' },
    { id: 'IN_PROCCESS', name:'En proceso' },
    { id: 'DELIVERED', name:'Entregado' },
    { id: 'INVOICED', name:'Facturado' },
    { id: 'CANCELLED', name:'Cancelado' }
  ];
  public filter:any={
    status:'',
    id:''
  }
  public results: any[] = [];
  constructor(
    private apiService:ApiService,
    private loginService:LoginService,
    private spinner: NgxSpinnerService,
    private router: Router,) { 
      if(!this.loginService.user.id) this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.spinner.show();
    this.apiService.getOrders(this.filter.status,this.filter.id).subscribe(
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


  goToDetail(id:Number){
    this.router.navigate(['pedidos/'+id]);
  }

}
