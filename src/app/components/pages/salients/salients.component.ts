import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-salients',
  templateUrl: './salients.component.html',
  styles: [
  ]
})
export class SalientsComponent implements OnInit {
  salients: any[] = [];
  constructor(private apiService:ApiService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getSalients();
  }

  getSalients(){
    this.spinner.show();
    this.apiService.productsSalient().subscribe(
      (data:any) => {
        this.salients = data;
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
