import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { WebsocketService } from './websocket.service';
import { IMsj } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Chat';
  mensajes: IMsj[] = [];

  modelForm = this._fb.group({
    msj:[]
  })

  constructor(private _fb: UntypedFormBuilder, private _wsService: WebsocketService) { }
  
  ngOnInit(): void {
    this._wsService.onMessage.subscribe(x => {
      console.log(x);
      this.mensajes.push(x);
    })
  }

  send() {

    const msj = {
      name: 'Manuel',
      text: this.modelForm.value.msj,
      date: new Date()
    }

    this._wsService.ws?.send(JSON.stringify(msj));

    this.mensajes.push({
      ...msj,
      own: true
    });
    this.modelForm.reset();
  }

  enter(ev: KeyboardEvent){
    if(ev.key === 'Enter'){
      this.send()
    }
  }
}
