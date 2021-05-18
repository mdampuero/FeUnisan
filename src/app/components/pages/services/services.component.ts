import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  results: any[] = [];
  service: any = {};
  public environment:any=environment;
  public categorySelected:any;
  public serviceId:any;

  constructor(
    private route: ActivatedRoute,
    private apiService:ApiService,
    private router: Router,
    private spinner: NgxSpinnerService) {
      this.route.paramMap.subscribe(params => {
        this.ngOnInit();
      });
    }

    ngOnInit(): void {
      this.serviceId=this.route.snapshot.paramMap.get("key");
      this.categorySelected=this.route.snapshot.paramMap.get("category");
      this.spinner.show();
      this.apiService.servicesGetById(this.serviceId,this.categorySelected).subscribe(
        (data:any) => {
          this.spinner.hide();
          this.service=data["service"];
          this.results=data["models"];
        },
        (error) => {
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
    }
}
