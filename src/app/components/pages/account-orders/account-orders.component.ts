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

  public results: any[] = [];
  constructor(
    private apiService:ApiService,
    private loginService:LoginService,
    private spinner: NgxSpinnerService,
    private router: Router,) { 
      if(!this.loginService.user.id) this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.spinner.show();
    this.apiService.getOrders().subscribe(
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
