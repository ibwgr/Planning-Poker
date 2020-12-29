import {Component, Input, OnInit} from '@angular/core';
import {ConnectionService} from '../connection.service';
import {LocalStorageService} from "../local-storage.service";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() fibonacciMaster;

  buttonClicked: boolean = false;
  userEntered: boolean = false;
  username: string;
  votes: any = [];
  freezeCards: boolean = false;
  resetMessages = [];
  loggedInUsers: any = [];
  activeCard: any;
  adminChecked: boolean = false;
  adminDisabled: boolean = false;
  imgSrc = "assets/images/coffee.png"


  constructor(private connectionService: ConnectionService, private localStorage: LocalStorageService) {
    connectionService.connection.subscribe((data) => {
      const message = JSON.parse(data);

      if (message.type === 'newRound'){
        this.freezeCards = false;
        this.buttonClicked = false;
        this.votes = [];
        this.activeCard = null;
        this.localStorage.delete("message")
      } else if (message.type === 'addUser'){
        this.loggedInUsers.push(message.user);
      } else if (message.type === 'deleteUser'){
        this.loggedInUsers.splice(this.loggedInUsers.indexOf(message.user), 1)
      } else if (message.type === 'toggleAdmin'){
        this.adminDisabled = !this.adminDisabled;
      }
    });
  }

  ngOnInit(): void {
    this.username = this.localStorage.get("username");
  }

  setEstimation(vote: number):void {
    this.connectionService.connection.next( {
      user: this.username, type: 'votings', text: vote
    });

    this.votes.push(this.username + ":", vote);
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
    this.localStorage.delete("message")
  }

  enterUser() {
    this.connectionService.connection.next({
      type: 'addUser', user: this.username
    });
    this.loggedInUsers.push(this.username);
    this.userEntered = true;
    this.persistUsername("username", this.username)
  }


  persistUsername(key: string, value: any){
    this.localStorage.set(key, value)
  }

  deleteUser() {
    this.connectionService.connection.next({
      type: 'deleteUser', user: this.username
    });
    this.loggedInUsers.splice(this.loggedInUsers.indexOf(this.username), 1)
    this.username = "";
    this.persistUsername("username", this.username)
    this.userEntered = false;
  }

  toggleAdmin() {
    this.connectionService.connection.next({
      type: 'toggleAdmin'
    });
    this.adminChecked = !this.adminChecked;
  }

  redCoffee() {
    this.imgSrc = "assets/images/redcoffee.png"
  }

  blackCoffee() {
    this.imgSrc = "assets/images/coffee.png"
  }
}
