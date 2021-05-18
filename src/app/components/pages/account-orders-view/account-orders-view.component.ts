import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-account-orders-view',
  templateUrl: './account-orders-view.component.html',
  styles: [
  ]
})
export class AccountOrdersViewComponent implements OnInit {
  id:any;
  results: any;
  ready:boolean=false;
  public data:any={ items:[]}
  public filter:any={
    status:''
  }
  constructor(
    private loginService:LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService,
    private spinner: NgxSpinnerService) { 
      if(!this.loginService.user.id) this.router.navigate(['/login']);
    }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get("id");
    this.spinner.show();
    this.apiService.getOrder(this.id).subscribe(
      (data:any) => {
        this.results=data;
      },
      (error) => {
        this.spinner.hide();
      },
      () => {
        this.ready=true;
        this.spinner.hide();
      }
    );
  }

}
