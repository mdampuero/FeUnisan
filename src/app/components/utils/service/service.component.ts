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
  results: any = {
    forHome:[],
    forIndustry:[],
    forEvent:[]
  };
  filters: any = {
    forHome:[],
    forIndustry:[],
    forEvent:[]
  };
  categories: any[] = [];
  servicesFiltered: any[] = [];
  selectedCategoryDefault: any = {};
  selectedCategory='forIndustry';
  selectedFilter='';
  constructor(
    private apiService:ApiService,
    private spinner: NgxSpinnerService,
    public events: Events
  ) {
    this.events.subscribe('service', (data: any) => {
      this.selectedCategory=data.serviceSelected;
      this.selectedFilter=data.subserviceSelected;
    });
  }

  selectCategory(category: string){
    this.selectedCategory=category;
    this.selectFilter('');
  }
  
  selectFilter(filter: string){
    this.selectedFilter=filter;
    this.filter();
  }

  filter(){
    this.servicesFiltered=[];
    for(let i=0; i<this.filters[this.selectedCategory].length; i++){
      if(this.filters[this.selectedCategory][i].name == this.selectedFilter){
        this.servicesFiltered=this.filters[this.selectedCategory][i].services;
      }
    }
    this.servicesFiltered = this.servicesFiltered.filter((v, i, a) => a.indexOf(v) === i);

    for(let i=0; i<this.results[this.selectedCategory].length; i++){
      if(this.inArray(this.results[this.selectedCategory][i].id,this.servicesFiltered) || this.selectedFilter==''){
        this.results[this.selectedCategory][i].display=true;
      }else{
        this.results[this.selectedCategory][i].display=false;
      }
    }
  }

  inArray(value:any,array:any){
    for(let i=0; i<array.length; i++){
      if(value==array[i])
      return true;
    }
    return false;
  }
  
  ngOnInit(): void {
    this.spinner.show();
    this.apiService.models("").subscribe(
      (data:any) => {
        this.results.forHome=data.forHome;
        this.results.forIndustry=data.forIndustry;
        this.results.forEvent=data.forEvent;
        this.selectCategory('forIndustry');
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.spinner.hide();
      }
    );
    this.apiService.filters("").subscribe(
      (data:any) => {
        this.filters.forHome=data.forHome;
        this.filters.forIndustry=data.forIndustry;
        this.filters.forEvent=data.forEvent;
        this.selectCategory('forIndustry');
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.spinner.hide();
      }
    );
    // this.apiService.getCategoriesService().subscribe(
    //   (data:any) => {
    //    /// this.categories=data["data"];
    //     // this.selectedCategoryDefault = this.categories.filter((category) => category.id == this.selectedCategory)[0];
    //     // if(this.selectedCategoryDefault['subcategories'].length > 0)
    //     //   this.selectedSubcategory=this.selectedCategoryDefault['subcategories'][0].id;
        
    //   },
    //   (error) => {
    //     console.error(error);
    //   },
    //   () => {
    //     this.spinner.hide();
    //   }
    // );
  }

}
