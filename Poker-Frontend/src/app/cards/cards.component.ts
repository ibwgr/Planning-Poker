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
      if (message.type === 'updateUser'){
        this.loggedInUsers = message.text;
      }
      if (message.type === 'addUser'){
        this.addUserForAll(message);
      }
      if (message.type === 'deleteUser'){
        this.deleteUserForAll(message);
      }
      if (message.type === 'sendUserListToAdmin'){
        this.sendToWebsocketServer('myUserListToAdmin', this.loggedInUsers, "")
      }
      if (message.type === 'myUserListToAdmin'){
        this.generateAdminsUserlist(message.text)
      }
    }, () => {
      this.showErrorMessage()
    });
  }

  private deleteUserForAll(message) {
    this.loggedInUsers.splice(this.loggedInUsers.indexOf(message.user), 1);
    this.totalVoters--;
    if(this.adminChecked) {
      this.sendAdminsUserListToAll()
    }
  }

  private addUserForAll(message) {
    this.loggedInUsers.push(message.user);
    this.totalVoters++;
    if(this.adminChecked) {
      this.sendAdminsUserListToAll();
    }
  }

  private sendAdminsUserListToAll() {
    this.sendToWebsocketServer('updateUser', this.loggedInUsers, "")
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

  private resetValues(): void {
    this.freezeCards = false;
    this.buttonClicked = false;
    this.votes = [];
    this.activeCard = null;
    this.resetMessages = [];
    this.localStorage.delete("message");
    this.hasVoted = [];
    this.amountOfVotings = 0;
  }

  enterUser(): void {
    this.sendToWebsocketServer('addUser',"", this.username);
    this.userEntered = true;
    this.persistUsername("username", this.username)
    this.loggedInUsers.unshift(this.username);
  }


  persistUsername(key: string, value: any): void{
    this.localStorage.set(key, value)
  }

  deleteUser(): void {
    this.sendToWebsocketServer('deleteUser', "", this.username);
    this.loggedInUsers.splice(this.loggedInUsers.indexOf(this.username), 1);
    this.username = "";
    this.persistUsername("username", this.username);
    this.userEntered = false;
  }

  toggleAdmin(): void {
    this.adminChecked = !this.adminChecked;
    this.sendToWebsocketServer('sendUserListToAdmin', "", this.username);
  }

  private sendToWebsocketServer(messageType: string, messageContent: any, user: string): void {
    this.connectionService.connection.next({
      user: user, type: messageType, text: messageContent,
    });
  }

  redCoffee(): void {
    this.imgSrc = "assets/images/redcoffee.png"
  }

  blackCoffee(): void {
    this.imgSrc = "assets/images/coffee.png"
  }

  showErrorMessage(): string{
  return this.errorMessage = 'WebSocketServer is not available, please contact your administrator!!'
  }

  private generateAdminsUserlist(userList) {
    if(this.adminChecked){
      this.concatUserList(userList)
      this.sendAdminsUserListToAll();
      this.totalVoters = this.loggedInUsers.length - 1;
    }
  }

  private concatUserList(userList) {
    let concatenatedUserList = [...this.loggedInUsers, ...userList];
    let userListSet = new Set(concatenatedUserList);
    this.loggedInUsers = Array.from(userListSet);
  }
}
