import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalProductComponent } from '../../utils/modal-product/modal-product.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from 'src/app/services/db/popup.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {}
}
