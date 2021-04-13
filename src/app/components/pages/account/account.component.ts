import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: [
  ]
})
export class AccountComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router: Router) { 
    if(!this.loginService.user.id) this.router.navigate(['/login']);
  }

  ngOnInit(): void {
  }

}
