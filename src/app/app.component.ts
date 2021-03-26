import { Component } from '@angular/core';
import { LoginService } from './services/db/login.service';
import { ApiService } from 'src/app/services/api.service';

// declare var ClientJS:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FeUnisan';
  client:any;
  constructor(
    private loginService:LoginService,
    private apiService:ApiService,
    ) {
      console.log("init");
      this.apiService.getPopup();
      this.apiService.visit().subscribe(
        (data:any) => {
          //console.log(data);
        },
        (error) => {
        },
        () => {
        }
      );
     }

  logout(){
    this.loginService.logout();
  }
}
