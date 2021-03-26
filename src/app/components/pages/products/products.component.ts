import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/services/db/login.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from 'src/app/services/db/popup.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit {
  results: any[] = [];
  salients: any[] = [];
  categories: any[] = [
    { id:'', name:'Categorías' }
  ];
  total = 0;
  query:string = '';
  category = { id:'', name:'Categorías' };
  constructor(
    private loginService:LoginService,
    private popupService:PopupService,
    private apiService:ApiService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService) {
    }

  ngOnInit(): void {
    this.getCategories();
    this.getSalients();
    this.search();
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

  getCategories(){
    this.apiService.getCategories().subscribe(
      (data:any) => {
        data["data"].forEach((myObject: any, index: any) => {
          myObject.quantity=0;
          myObject.subtotal=0;
          this.categories.push(myObject);
        });
        this.category=this.categories[0];
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  search(){
    console.log(this.category);
    this.spinner.show();
    this.apiService.searchProduct(this.query,this.category).subscribe(
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
  onEnter(){
    this.search();
  }
}
