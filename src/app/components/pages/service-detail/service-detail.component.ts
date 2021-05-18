import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html'
})
export class ServiceDetailComponent implements OnInit {
  public item:any;
  public ready:boolean = false;
  public categorySelected:any;
  public modelId:any;
  public environment:any=environment;
  constructor(
    private route: ActivatedRoute,
    private api:ApiService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.route.paramMap.subscribe(params => {
      this.ngOnInit();
    });
   }

  goToCotization(id:any){
    this.router.navigate(['solicitarCotizacion/'+this.categorySelected+'/'+this.modelId]);
  }
  
  ngOnInit(): void {
    this.modelId=this.route.snapshot.paramMap.get("key");
    this.categorySelected=this.route.snapshot.paramMap.get("category");
    this.spinner.show();
    this.api.getModel(this.modelId).subscribe(
      (data:any) => {
        this.item=data;
        this.spinner.hide();
      },
      (error) => {
        console.error(error);
        this.spinner.hide();
      },
      () => {
        this.ready=true;
        this.spinner.hide();
      }
    );
  }

}
