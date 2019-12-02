import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Socket } from 'ngx-socket-io';



@Injectable({
  providedIn: 'root',
})
export class WebService {

  private socket: any;
  readonly url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }

  public listener = (eventName: string) => {
    return new Observable(observer => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });
    });
  }
  public emit = (eventName: string, data: any) => {
    this.socket.emit(eventName, data);
  }

}
