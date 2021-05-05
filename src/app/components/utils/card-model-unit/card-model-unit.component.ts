import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-card-model-unit',
  templateUrl: './card-model-unit.component.html'
})
export class CardModelUnitComponent implements OnInit {

  @Input() item: any;
  @Input() categorySelected: any;
  public environment:any=environment;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToModel(id:any){
    this.router.navigate(['servicio/'+this.categorySelected+'/'+id]);
  }

}
