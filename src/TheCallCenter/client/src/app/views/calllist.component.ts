import { Component, OnInit } from '@angular/core';
import { CallService } from '../services';

@Component({
  templateUrl: 'calllist.component.html',
  styles: []
})
export class CallListView {

  constructor(private callService: CallService) { }

  calls = [];

  ngAfterContentInit() {
    this.callService.load()
      .subscribe(success => {
        this.calls = this.callService.calls;
      });
  }

}
