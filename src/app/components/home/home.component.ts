import { Component, OnInit } from '@angular/core';
import { ModalProductComponent } from '../utils/modal-product/modal-product.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from 'src/app/services/db/popup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private popupService:PopupService,private modalService: NgbModal) {}

  ngOnInit(): void {}

  checkPopup(){
    let popup=this.popupService.getBySection('HOME');
    if(popup){
      const modalRef = this.modalService.open(ModalProductComponent,{size: 'lg'});
      modalRef.componentInstance.data = popup
    }
  }

  ngAfterViewInit(): void {
    this.checkPopup();
  }
}
