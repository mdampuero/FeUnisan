import { Component } from '@angular/core';
import { LoginService } from './services/db/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FeUnisan';
  constructor(
    private loginService:LoginService
    ) { }

  logout(){
    this.loginService.logout();
  }
}
