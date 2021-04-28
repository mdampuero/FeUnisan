import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-service-unit',
  templateUrl: './card-service-unit.component.html'
})
export class CardServiceUnitComponent implements OnInit {
  @Input() item: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToService(id:any){
    this.router.navigate(['servicios/'+id]);
  }
  
}
