import { EventEmitter, Injectable } from '@angular/core';
import { IMsj } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  ws?: WebSocket;
  onMessage = new EventEmitter<IMsj>();

  constructor() { 
    this.ws = new WebSocket('wss://simplewebsocket-dev-hded.2.us-1.fl0.io')


    this.ws.onmessage = ({data}: MessageEvent) => {

      const reader = new FileReader();

      reader.onload = () => {
        
        this.onMessage.emit(JSON.parse(reader.result as any))   
      }
      reader.readAsText(data);
    }
  }
}
