import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-account-convenios-view',
  templateUrl: './account-convenios-view.component.html',
  styles: [
  ]
})
export class AccountConveniosViewComponent implements OnInit {
  id:any;
  results: any;
  ready:boolean=false;
  constructor(
    private apiService:ApiService,
    private loginService:LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    if(!this.loginService.user.id) this.router.navigate(['/login']);
   }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get("key");
    this.getResults();
  }
  
  getResults(){
    this.spinner.show();
    this.apiService.convenios({ Rut:this.loginService.user.document,IdConvenio: this.id }).subscribe(
      (data:any) => {
        this.results = data[0];
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
