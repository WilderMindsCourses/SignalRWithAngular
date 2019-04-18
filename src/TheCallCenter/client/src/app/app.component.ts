import { Component } from '@angular/core';
import { CallService } from "./services";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {

  constructor(private callService: CallService) { }

  get error() {
    return this.callService.error;
  }

  get isBusy() {
    return this.callService.isBusy;
  }
}
