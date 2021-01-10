import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {ConnectionService} from "../services/connection.service";


@Component({
  selector: 'app-estimations',
  templateUrl: './estimations.component.html',
  styleUrls: ['./estimations.component.css']
})
export class EstimationsComponent implements OnInit, OnChanges {

  @Input() votes;
  @Input() fibonacciMaster;
  @Input() adminChecked;
  averageEstimation: string;
  highestEstimation: string;
  lowestEstimation: string;
  allEstimations: any[];



  constructor(private connectionService: ConnectionService) {

    connectionService.connection.subscribe((data) => {
      const message = JSON.parse(data);

      if (message.type === 'votings'){
        this.votes.push(message.user + ' ' + message.text);
      }
      if (message.type === 'newRound'){
        this.votes = [];
        this.resetEstimations();
      }
      if (message.type === 'averageEstimation'){
        this.averageEstimation = message.text;
        this.showEstimation(this.votes)
      }
      if (message.type === 'highestEstimation'){
        this.highestEstimation = message.text;
      }
      if (message.type === 'lowestEstimation'){
        this.lowestEstimation = message.text;
      }
      if (message.type === 'estimations'){
        this.allEstimations = message.text;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.resetEstimations()
  }

  private resetEstimations(): void {
    this.averageEstimation = null;
    this.highestEstimation = null;
    this.lowestEstimation = null;
    this.allEstimations = [];
  }


  showResults(votes): any{
    const estimations = this
      .removeUsernames(votes)
      .filter(this.removeZeros());

    this.averageEstimation = "Average: " + this.calcAverage(estimations);
    this.sendToWebsocketServer('averageEstimation', this.averageEstimation);

    this.highestEstimation = "Highest: " + Math.max.apply(null,estimations);
    this.sendToWebsocketServer('highestEstimation', this.highestEstimation);

    this.lowestEstimation = "Lowest: " + Math.min.apply(null,estimations);
    this.sendToWebsocketServer('lowestEstimation', this.lowestEstimation);

    this.showEstimation(this.votes);
    this.sendToWebsocketServer('estimations', this.votes)
  }

  removeUsernames(votes) {
    return votes.map(singleVote => {
      if (typeof singleVote === 'string') {
        return parseInt(singleVote.slice(-1))
      } else {
        return singleVote;
      }
    });
  }

  removeZeros(): any {
    return value => {
      return value > 0
    };
  }

   calcAverage(estimations): number{
    const average = this.calcSum(estimations) / estimations.length;
    let nextFibonacci = 0;

    this.fibonacciMaster.forEach((fibonacci) => {
      if(average <= fibonacci && nextFibonacci === 0){
        nextFibonacci = fibonacci;
      }
    });
    return nextFibonacci;
  }

   calcSum(estimations): number {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return estimations.reduce(reducer, 0);
  }

  private sendToWebsocketServer(messageType: string, messageContent: any): void {
    this.connectionService.connection.next({
      type: messageType, text: messageContent,
    });
  }

  private showEstimation(votes): void{
    this.allEstimations = votes;
  }
}
