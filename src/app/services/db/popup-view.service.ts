import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupViewService {

  list: any[] = [];
  constructor() {
    this.loadStorage();
  }

  get(id: string) {
    return this.list.find((listData) => listData.id === id);
  }

  // clear() {
  //   this.saveStorage([]);
  // }

  saveStorage() {
    localStorage.setItem("popups-views", JSON.stringify(this.list));
  }

  set(popup: { id: any;display: string }) {
    let date= new Date();
    let data={
      popup:popup.id,
      count:0,
      show:date,
      display: popup.display
    }
    const index = this.list.findIndex((listData) => listData.popup === popup.id);
    if(index < 0){
      this.list.push(data);
    }else{
      this.list[index].show=date;
      this.list[index].count++;
    }
    this.saveStorage();
  }

  getByPopupId(id:string){
    return this.list.find((listData) => listData.popup === id);
  }

  showing(popup: any){
    this.set(popup);
    return popup;
  }

  isShowing(popup: { id: any,display:string }) {
    if(typeof popup=='undefined') 
      return false;

    let register=this.getByPopupId(popup.id);
    
    if(!register || popup.display == 'SHOW_ALWAYS') 
      return this.showing(popup);
    
    let dateCurrent = new Date();
    let dateCurrentString=dateCurrent.getFullYear()+'-'+String(dateCurrent.getMonth() + 1).padStart(2, '0')+'-'+String(dateCurrent.getDate()).padStart(2, '0');
    switch (popup.display){
      case 'SHOW_FOR_ONCE_DAY':
        var dateShow = new Date(register.show);
        let dateShowString=dateShow.getFullYear()+'-'+String(dateShow.getMonth() + 1).padStart(2, '0')+'-'+String(dateShow.getDate()).padStart(2, '0');
        if(dateShowString!=dateCurrentString) 
          return this.showing(popup);
        break;
      case 'SHOW_FOR_SESSION':
        var dateShow = new Date(register.show);
        var dateShowMili=dateShow.valueOf();
        if(((dateShowMili+3600000) - dateCurrent.valueOf())<0) 
          return this.showing(popup);
        break;
      default:
    }
    return false;
  }

  loadStorage() {
    if (JSON.parse(localStorage.getItem("popups-views")!)) {
      this.list = JSON.parse(localStorage.getItem("popups-views")!);
    }
  }
}
