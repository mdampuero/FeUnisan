import { Component, Input, OnInit } from '@angular/core';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
})
export class CardProductComponent implements OnInit {
  @Input() item: any;
  public environment:any=environment;
  constructor(private modalService: NgbModal,private router: Router) { 
  }

  ngOnInit(): void {
  }

  goToProduct(id:String){
    this.router.navigate(['producto/'+id]);
  }

  // open(index:any) {
  //   const modalRef = this.modalService.open(ModalProductComponent,{size: 'lg'});
  //   modalRef.componentInstance.data = this.items[index];
  // }
}
