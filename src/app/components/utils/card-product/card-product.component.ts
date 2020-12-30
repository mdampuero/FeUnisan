import { Component, Input, OnInit } from '@angular/core';
import { ModalProductComponent } from '../modal-product/modal-product.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router';
@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
})
export class CardProductComponent implements OnInit {
  @Input() items: any[] = [];
  constructor(private modalService: NgbModal,private router: Router) { 
    
  }

  ngOnInit(): void {
  }

  goToProduct(id:String){
    this.router.navigate(['producto/'+id]);
  }

  open(index:any) {
    const modalRef = this.modalService.open(ModalProductComponent,{size: 'lg'});
    modalRef.componentInstance.data = this.items[index];
  }
}
