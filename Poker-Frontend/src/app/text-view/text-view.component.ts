import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ConnectionService} from "../services/connection.service";
import {LocalStorageService} from "../services/local-storage.service";

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})

export class TextViewComponent implements OnInit, OnChanges{

  @Input() username: string;
  @Input() resetMessages;
  messages: any = [];
  textcontent: string;


  constructor(private connectionService: ConnectionService, private localStorage: LocalStorageService) {
    connectionService.connection.subscribe((data) => {
    const message = JSON.parse(data);

    if (message.type === 'chat-message'){
      this.messages.unshift(message.user + ': ' + message.text);
      this.persistMessages("message", this.messages);
    } else if(message.type === 'newRound'){
      this.messages = [];
      }
    })
  };


  ngOnInit(): void {
    if (this.localStorage.get("message") != null)
   this.messages = this.localStorage.get("message");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.messages = this.resetMessages
  }

  submitText(): void {
    this.connectionService.connection.next( {
       type: 'chat-message', text: this.textcontent, user: this.username
    });
    this.messages.unshift(this.textcontent);
    this.textcontent = '';
    this.persistMessages("message", this.messages);
  }

  persistMessages(key: string, value: any): void {
      this.localStorage.set(key, value)
    }
}
