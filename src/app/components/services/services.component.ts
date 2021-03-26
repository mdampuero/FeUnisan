import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopupService } from 'src/app/services/db/popup.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProductComponent } from '../utils/modal-product/modal-product.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html'
})
export class ServicesComponent implements OnInit {
  results: any[] = [];
  total = 0;
  constructor(
    private popupService:PopupService,
    private modalService: NgbModal,
    private apiService:ApiService,
    private spinner: NgxSpinnerService) {
      
    }

  ngOnInit(): void {
    
    this.spinner.show();
    this.apiService.services("").subscribe(
      (data:any) => {
        this.results=data["data"];
        this.checkPopup();
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  checkPopup(){
    let popup=this.popupService.getBySection('SERVICES');
    if(popup){
      const modalRef = this.modalService.open(ModalProductComponent,{size: 'lg'});
      modalRef.componentInstance.data = popup
    }
  }
}
