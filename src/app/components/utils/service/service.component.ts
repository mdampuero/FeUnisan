import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Events } from "src/app/services/events.service";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styles: [
  ]
})
export class ServiceComponent implements OnInit {
  results: any[] = [];
  categories: any[] = [];
  selectedCategoryDefault: any = {};
  selectedCategory='INDUSTRY';
  selectedSubcategory='ALL';
  constructor(
    private apiService:ApiService,
    private spinner: NgxSpinnerService,
    public events: Events
  ) {
    this.events.subscribe('service', (data: any) => {
      this.selectedCategory=data.serviceSelected;
      this.selectedSubcategory=data.subserviceSelected;
    });
    }

  selectCategory(category: string){
    this.selectedCategory=category;
  }
  
  selectSubcategory(subcategory: string){
    this.selectedSubcategory=subcategory;
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
        // this.selectedCategoryDefault = this.categories.filter((category) => category.id == this.selectedCategory)[0];
        // if(this.selectedCategoryDefault['subcategories'].length > 0)
        //   this.selectedSubcategory=this.selectedCategoryDefault['subcategories'][0].id;
        
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
