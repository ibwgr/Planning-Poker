import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal-compatibility";
import {webSocket} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor() { }

  connection: WebSocketSubject<any> = webSocket({url: 'ws://localhost:6969/', deserializer: e => e.data});

}
