import {Component, TemplateRef} from '@angular/core';
import {ToastService} from '../../../services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toast.component.html',
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  isTemplate(toast: { textOrTpl: any; }) { return toast.textOrTpl instanceof TemplateRef; }
}

// showStandard() {
//   this.toastService.show('I am a standard toast', {
//     delay: 2000,
//     autohide: true
//   });
// }

// showSuccess() {
//   this.toastService.show('I am a success toast', {
//     classname: 'bg-success text-light',
//     delay: 2000 ,
//     autohide: true,
//     headertext: 'Toast Header'
//   });
// }
// showError() {
//   this.toastService.show('I am a success toast', {
//     classname: 'bg-danger text-light',
//     delay: 2000 ,
//     autohide: true,
//     headertext: 'Error!!!'
//   });
// }

// showCustomToast(customTpl: string | TemplateRef<any>) {
//   this.toastService.show(customTpl, {
//     classname: 'bg-danger text-light',
//     delay: 3000,
//     autohide: true
//   });
// }