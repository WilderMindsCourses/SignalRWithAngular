import { Injectable } from '@angular/core';
import { Observable, of,  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CallService {

  constructor(private http: HttpClient) {
  }

  private isLoaded: boolean = false;
  public calls = [];
  public error = "";
  public isBusy: boolean = false;

  load(): Observable<boolean> {
    this.isBusy = true;
    if (this.isLoaded) {
      return Observable.create(o => {
        this.isBusy = false;
        o.next(true);
        o.complete();
      });
    } else {
      return this.http.get("/api/calls")
        .pipe(
          map((data: any[]) => {
            this.isBusy = false;
            this.calls = data;
            this.isLoaded = true;
            return true;
          }));
    }
  }

  private findCall(id: number) { return this.calls.find(c => c.id == id); }

  getCall(id) : Observable<any> {
    this.isBusy = true;
    if (this.isLoaded) {
      return Observable.create(ob => {
        this.isBusy = false;
        ob.next(this.findCall(id));
        ob.complete();
      });
    } else {
      return Observable.create(ob => {
        this.load().subscribe(success => {
          this.isBusy = false;
          ob.next(this.findCall(id));
          ob.complete();
        });
      });
    }
  }

  addCall(call): void {
    if (this.isLoaded) {
      this.calls.push(call);
    } else {
      this.load().subscribe(success => {
        this.calls.push(call);
      });
    }
  }

  private removeCall(call): void {
    let index = this.calls.findIndex(c => c.id === call.id);
    if (index > -1) {
      this.calls.splice(index, 1);
    }
  }

  markAsAnswered(call): Observable<boolean> {
    this.isBusy = true;
    return this.http.patch(`/api/calls/${call.id}/answer`, null)
      .pipe(
        map(data => {
          this.removeCall(call);      
          this.isBusy = false;
          return true;
        })
      );
  }

}