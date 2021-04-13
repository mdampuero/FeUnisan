import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-account-convenios',
  templateUrl: './account-convenios.component.html',
  styles: [
  ]
})
export class AccountConveniosComponent implements OnInit {

  results: any[] = [];
  constructor(private apiService:ApiService,
    private loginService:LoginService,
    private router: Router,
    private spinner: NgxSpinnerService) {  if(!this.loginService.user.id) this.router.navigate(['/login']); 
  console.log(this.loginService.user);}
  ngOnInit(): void {
    this.getResults();
  }

  getResults(){
    this.spinner.show();
    this.apiService.convenios({Rut:this.loginService.user.document}).subscribe(
      (data:any) => {
        this.results = data;
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  goToDetail(key: string){
    this.router.navigate(['convenios/'+key]);
  }
}
