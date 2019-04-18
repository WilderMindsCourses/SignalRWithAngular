import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CallService } from "../services";

@Component({
  templateUrl: 'call.component.html',
  styles: []
})
export class CallView implements OnInit {

  constructor(private route: ActivatedRoute, private callService: CallService, private router: Router) {
  }

  call = {};

  ngOnInit(): void {
    this.callService.getCall(this.route.snapshot.params.id)
      .subscribe(
        call => {
          if (!call) {
            this.router.navigate(['/call-list']);
          }
          this.call = call;
        },
        () => {
          this.router.navigate(['/call-list']);
        });
  }

  answer() {
    this.callService.markAsAnswered(this.call)
      .subscribe(success => {
        this.router.navigate(['/call-list'])
      });
  }
}
