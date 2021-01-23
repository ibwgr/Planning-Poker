import { Injectable } from '@angular/core';
import {WebSocketSubject} from "rxjs/internal-compatibility";
import {webSocket} from "rxjs/webSocket";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor() { }

  connection: WebSocketSubject<any> = webSocket({url: environment.websocketAPI, deserializer: e => e.data})

}
