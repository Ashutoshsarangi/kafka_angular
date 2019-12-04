import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import io from 'socket.io-client';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class WebService {

  private socket: any;
  readonly url = 'http://43.241.63.44:3000/';
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
