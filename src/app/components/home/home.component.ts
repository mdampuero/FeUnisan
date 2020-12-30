import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/db/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  results: any[] = [];
  total = 0;
  constructor(
    private loginService:LoginService,
    private apiService:ApiService,
    private router: Router,
    private spinner: NgxSpinnerService) {
      if(!this.loginService.user.id) this.router.navigate(['/login']);
    }

  ngOnInit(): void {
    
    this.spinner.show();
    this.apiService.searchProduct("").subscribe(
      (data:any) => {
        this.total = data["recordsFiltered"];
        this.results = data["results"];
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
