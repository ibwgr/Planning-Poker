import {Component, Input, OnInit} from '@angular/core';
import {ConnectionService} from '../services/connection.service';
import {LocalStorageService} from "../services/local-storage.service";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  @Input() fibonacciMaster;
  errorMessage: string;
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
  hasVoted: any = [];
  amountOfVotings: number = 0;
  totalVoters: number = 0;
  imgSrc = "assets/images/coffee.png";



  constructor(private connectionService: ConnectionService, private localStorage: LocalStorageService ) {
    connectionService.connection.subscribe((data) => {
      const message = JSON.parse(data);

      if (message.type === "votings"){
        this.hasVoted.push(message.user + " has voted.");
        this.amountOfVotings ++;
      }

      if (message.type === 'newRound'){
        this.resetValues();
      }
      if (message.type === 'addUser'){
        this.loggedInUsers.push(message.user);
        this.totalVoters ++;
      }
      if (message.type === 'deleteUser'){
        this.loggedInUsers.splice(this.loggedInUsers.indexOf(message.user), 1);
        this.totalVoters --;
      }
      if (message.type === 'toggleAdmin'){
        this.adminDisabled = !this.adminDisabled;
      }
    }, () => {
      this.showErrorMessage()
    });
  }

  ngOnInit(): void {
    this.username = this.localStorage.get("username");
  }

  setEstimation(vote: number):void {
    this.sendToWebsocketServer('votings', vote, this.username);
    this.votes.push(this.username + ":", vote);
    this.buttonClicked = true;
    this.freezeCards = true
  }

  newRound():void {
    this.resetValues();
    this.sendToWebsocketServer('newRound',"","")
  }

  private resetValues() {
    this.freezeCards = false;
    this.buttonClicked = false;
    this.votes = [];
    this.activeCard = null;
    this.resetMessages = [];
    this.localStorage.delete("message");
    this.hasVoted = [];
    this.amountOfVotings = 0;
  }

  enterUser() {
    this.sendToWebsocketServer('addUser',"", this.username);
    this.loggedInUsers.push(this.username);
    this.userEntered = true;
    this.persistUsername("username", this.username)
  }


  persistUsername(key: string, value: any){
    this.localStorage.set(key, value)
  }

  deleteUser() {
    this.sendToWebsocketServer('deleteUser', "", this.username);
    this.loggedInUsers.splice(this.loggedInUsers.indexOf(this.username), 1);
    this.username = "";
    this.persistUsername("username", this.username);
    this.userEntered = false;
  }

  toggleAdmin() {
    this.sendToWebsocketServer('toggleAdmin',"","");
    this.adminChecked = !this.adminChecked;
  }

  private sendToWebsocketServer(messageType: string, messageContent: any, user: string) {
    this.connectionService.connection.next({
      user: user, type: messageType, text: messageContent,
    },);
  }

  redCoffee() {
    this.imgSrc = "assets/images/redcoffee.png"
  }

  blackCoffee() {
    this.imgSrc = "assets/images/coffee.png"
  }

  showErrorMessage(){
  return this.errorMessage = 'WebSocketServer is not available, please contact your administrator!!'
  }

}
