import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private apiService:ApiService,private router: Router) { }

  ngOnInit(): void {
    this.getSalients();
  }

  goToProduct(id:String){
    this.router.navigate(['producto/'+id]);
  }
  getSalients(){
    this.apiService.productsSalient().subscribe(
      (data:any) => {
        this.salients = data;
      },
      (error) => {
        console.error(error);
      },
      () => {
      }
    );
  }
}
