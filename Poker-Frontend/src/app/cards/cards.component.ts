import {Component, OnInit} from '@angular/core';
import {ConnectionService} from '../connection.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  toggle1: boolean = false;
  toggle2: boolean = false;
  toggle3: boolean = false;
  toggle5: boolean = false;
  toggle8: boolean = false;
  toggle0: boolean = false;

  buttonClicked: boolean = false;

  username: string;
  public votes: any = [];
  freezeCards: boolean = false;

  public resetValues = [];


  constructor(private connectionService: ConnectionService) {
    connectionService.connection.subscribe((data) => {
      const message = JSON.parse(data);

      if (message.type === 'newRound'){
        this.freezeCards = false;
        this.buttonClicked = false;
        this.toggle1 = false;
        this.toggle2 = false;
        this.toggle3 = false;
        this.toggle5 = false;
        this.toggle8 = false;
        this.toggle0 = false;
      }
    });
  }

  ngOnInit(): void {
  }

  selectCard(id:number):void {

    if (id === 1) {
      this.toggle1 = !this.toggle1;
      this.toggle2 = false;
      this.toggle3 = false;
      this.toggle5 = false;
      this.toggle8 = false;
      this.toggle0 = false;
      }
    else if (id === 2) {
      this.toggle2 = !this.toggle2;
      this.toggle1 = false;
      this.toggle3 = false;
      this.toggle5 = false;
      this.toggle8 = false;
      this.toggle0 = false;
    }
    else if (id === 3) {
      this.toggle3 = !this.toggle3;
      this.toggle2 = false;
      this.toggle1 = false;
      this.toggle5 = false;
      this.toggle8 = false;
      this.toggle0 = false;
    }
    else if (id === 5) {
      this.toggle5 = !this.toggle5;
      this.toggle2 = false;
      this.toggle3 = false;
      this.toggle1 = false;
      this.toggle8 = false;
      this.toggle0 = false;
    }
    else if (id === 8) {
      this.toggle8 = !this.toggle8;
      this.toggle2 = false;
      this.toggle3 = false;
      this.toggle5 = false;
      this.toggle1 = false;
      this.toggle0 = false;
    }
    else if (id === 0) {
      this.toggle0 = !this.toggle0;
      this.toggle2 = false;
      this.toggle3 = false;
      this.toggle5 = false;
      this.toggle8 = false;
      this.toggle1 = false;
    }
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
    this.toggle1 = false;
    this.toggle2 = false;
    this.toggle3 = false;
    this.toggle5 = false;
    this.toggle8 = false;
    this.toggle0 = false;

    this.votes = [];
    this.resetValues = null;
    this.connectionService.connection.next( {
      type: 'newRound'
    });


  }
}
