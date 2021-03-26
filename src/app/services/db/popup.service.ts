import { Injectable } from '@angular/core';
import { PopupViewService } from './popup-view.service';
@Injectable({
  providedIn: 'root'
})
export class PopupService {
  list: any[] = [];
  constructor( private popupViewService:PopupViewService) {
    this.loadStorage();
  }

  get(id: string) {
    return this.list.find((listData) => listData.id === id);
  }

  clear() {
    this.saveStorage([]);
  }

  saveStorage(data:any) {
    this.list=data;
    localStorage.setItem("popups", JSON.stringify(this.list));
  }

  getBySection(section: string) {
    return this.popupViewService.isShowing(this.list.find((listData) => listData.section.id === section));
  }

  loadStorage() {
    if (JSON.parse(localStorage.getItem("popups")!)) {
      this.list = JSON.parse(localStorage.getItem("popups")!);
    }
  }

}
