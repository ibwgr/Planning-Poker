import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ConnectionService} from "../connection.service";

@Component({
  selector: 'app-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.css']
})
export class TextViewComponent implements OnInit{

  public messages: any = [];
  public textcontent: string;
  @Input() public username: string;

  constructor(private connectionService: ConnectionService) {
    connectionService.ac.subscribe((data) => {
    const message = JSON.parse(data);

    if (message.type === 'chat-message'){
      this.messages.unshift(message.user + ' ' + message.text);
    }})};



  ngOnInit(): void {
  }


  submitText() {
    this.connectionService.ac.next( {
       type: 'chat-message', text: this.textcontent, user: this.username
    });
    this.messages.unshift(this.textcontent);
    this.textcontent = ''
  }
}
