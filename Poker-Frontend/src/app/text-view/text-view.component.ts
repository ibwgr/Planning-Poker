import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ConnectionService} from "../connection.service";

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit, OnChanges{

  public messages: any = [];
  public textcontent: string;
  @Input() public username: string;
  @Input() resetValues;

  constructor(private connectionService: ConnectionService) {
    connectionService.wss2.subscribe((data) => {
    const message = JSON.parse(data);

    if (message.type === 'chat-message'){
      this.messages.unshift(message.user + ' ' + message.text);
    } else if(message.type === 'newRound'){
      this.messages = [];
    }
    })};



  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.messages = this.resetValues
  }


  submitText() {
    this.connectionService.wss2.next( {
       type: 'chat-message', text: this.textcontent, user: this.username
    });
    this.messages.unshift(this.textcontent);
    this.textcontent = ''
  }
}
