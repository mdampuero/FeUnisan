import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: []
})
export class ModalProductComponent implements OnInit {
  @Input() data: any ={};
  public quantity:number | undefined;
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
  }

}
