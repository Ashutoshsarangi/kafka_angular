import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { LCONTAINER_LENGTH } from '@angular/core/src/render3/interfaces/container';



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

  public getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  }

  public setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
