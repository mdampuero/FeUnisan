import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-card-service-unit',
  templateUrl: './card-service-unit.component.html'
})
export class CardServiceUnitComponent implements OnInit {
  @Input() item: any;
  @Input() selectedCategory: any;
  public environment:any=environment;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToService(id:any){
    this.router.navigate(['servicios/'+this.selectedCategory+'/'+id]);
  }
  
}
