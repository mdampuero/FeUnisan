import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styles: [
  ]
})
export class ServiceComponent implements OnInit {
  results: any[] = [];
  categories: any[] = [];
  selectedCategory='INDUSTRY';
  constructor(
    private apiService:ApiService,
    private spinner: NgxSpinnerService
  ) {
      
    }

  selectCategory(category: string){
    this.selectedCategory=category;
  }
  
  ngOnInit(): void {
    this.spinner.show();
    this.apiService.services("").subscribe(
      (data:any) => {
        this.results=data["data"];
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.spinner.hide();
      }
    );
    this.apiService.getCategoriesService().subscribe(
      (data:any) => {
        this.categories=data["data"];
        console.log(this.categories);
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
