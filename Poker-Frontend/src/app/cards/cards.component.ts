import {Component, Input, OnInit} from '@angular/core';
import {ConnectionService} from '../connection.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() fibonacciMaster

  buttonClicked: boolean = false;
  userEntered: boolean = false;
  username: string;
  votes: any = [];
  freezeCards: boolean = false;
  resetMessages = [];
  loggedInUsers: any = [];
  activeCard: any;


  constructor(private connectionService: ConnectionService) {
    connectionService.connection.subscribe((data) => {
      const message = JSON.parse(data);

      if (message.type === 'newRound'){
        this.freezeCards = false;
        this.buttonClicked = false;
        this.votes = [];
        this.activeCard = null;
      }

     else if (message.type === 'users'){
        this.loggedInUsers.push(message.user);
      }
    });
  }

  ngOnInit(): void {
  }

  setEstimation(vote: number):void {
    this.connectionService.connection.next( {
      user: this.username + ": ", type: 'votings', text: vote
    });

    this.votes.push(this.username + ": ", vote);
    this.buttonClicked = true;
    this.freezeCards = true
  }

  newRound():void {
    this.freezeCards = false;
    this.buttonClicked = false;
    this.activeCard = null;
    this.votes = [];
    this.resetMessages = [];
    this.connectionService.connection.next( {
      type: 'newRound'
    });
  }

  enterUser() {
    this.connectionService.connection.next({
      type: 'users', user: this.username
    });
    this.loggedInUsers.push(this.username);
    this.userEntered = true;
  }
}
