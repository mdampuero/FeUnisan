import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  public data:any={ items:[]}
  constructor(
    private loginService:LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private apiService:ApiService,
    private spinner: NgxSpinnerService) { 
      if(!this.loginService.user.id) this.router.navigate(['/login']);
    }

  ngOnInit(): void {
    this.spinner.show();
    this.apiService.getOrder(this.route.snapshot.paramMap.get("id")).subscribe(
      (data:any) => {
        this.data=data;
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.spinner.hide();
      }
    );
  }

}
