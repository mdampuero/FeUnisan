import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-box-product-salient',
  templateUrl: './box-product-salient.component.html',
  styles: [
  ]
})
export class BoxProductSalientComponent implements OnInit {
  salients: any[] = [];
  public environment:any=environment;
  constructor(private apiService:ApiService,) { }

  ngOnInit(): void {
    this.getSalients();
  }

  getSalients(){
    this.apiService.productsSalient().subscribe(
      (data:any) => {
        this.salients = data;
        console.log(this.salients);
      },
      (error) => {
        console.error(error);
      },
      () => {
      }
    );
  }
}
