import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/db/cart.service';
import { LoginService } from 'src/app/services/db/login.service';
import { Events } from 'src/app/services/events.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  categories: any[] = [];
  @Input() fixed: boolean = true;
  results: any = {
    forHome:[],
    forIndustry:[],
    forEvent:[]
  };
  public environment:any=environment;
  constructor(
    public loginService:LoginService,
    public cartService:CartService,
    private apiService:ApiService,
    public events: Events,
    private router: Router) { }

  ngOnInit(): void {
    
    this.apiService.models("").subscribe(
      (data:any) => {
        this.results.forHome=data.forHome;
        this.results.forIndustry=data.forIndustry;
        this.results.forEvent=data.forEvent;
      },
      (error) => {
        console.error(error);
      },
      () => {
        
      }
    );
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  goToService(service: any){
    this.events.publish('service', {
      serviceSelected: service,
    });
  }

  login(){
    this.router.navigate(['/login']);
  }
}
