import { Component, Input, OnInit } from '@angular/core';
import { PopupService } from 'src/app/services/db/popup.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html'
})
export class PopupsComponent implements OnInit {
  @Input() section: any;
  public popup:any={notes:[]};
  constructor(private popupService:PopupService) { }

  ngOnInit(): void {
    let popup=this.popupService.getBySection(this.section);
    if(popup){
      this.popup=popup;
      setTimeout(function (){
        $('#btn-modal').trigger('click');
      },2000);
    }
  }

}
