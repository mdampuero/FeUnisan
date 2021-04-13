import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/db/cart.service';
import { LoginService } from 'src/app/services/db/login.service';
import { Events } from 'src/app/services/events.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  categories: any[] = [];
  constructor(
    public loginService:LoginService,
    public cartService:CartService,
    private apiService:ApiService,
    public events: Events,
    private router: Router) { }

  ngOnInit(): void {
    this.apiService.getCategoriesService().subscribe(
      (data:any) => {
        this.categories=data["data"];
        console.log(this.categories);
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

  goToService(service: any,subservice: any){
    this.events.publish('service', {
      serviceSelected: service,
      subserviceSelected: subservice,
    });
  }

  login(){
    this.router.navigate(['/login']);
  }
}
