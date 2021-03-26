import { Component, Input, OnInit } from '@angular/core';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html'
})
export class CardServiceComponent implements OnInit {

  @Input() items: any;
  @Input() selectedCategory: any;
  @Input() button: boolean=true;
  public environment:any=environment;
  constructor(private modalService: NgbModal,private router: Router) { 
  }
  
  goToCotization(id:String){
    this.router.navigate(['solicitarCotizacion/'+id]);
  }
  
  ngOnInit(): void {
    
  }

}
