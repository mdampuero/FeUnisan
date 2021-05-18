import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  constructor(public loginService:LoginService,private router: Router) { 
    console.log(this.loginService);
  }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
