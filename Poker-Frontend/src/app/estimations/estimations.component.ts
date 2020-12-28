import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {ConnectionService} from "../connection.service";

@Component({
  selector: 'app-estimations',
  templateUrl: './estimations.component.html',
  styleUrls: ['./estimations.component.css']
})
export class EstimationsComponent implements OnInit, OnChanges {

  @Input() votes;
  @Input() fibonacciMaster;
  public averageEstimation: string;
  public highestEstimation: string;
  public lowestEstimation: string;
  public allEstimations: any[];



  constructor(private connectionService: ConnectionService) {

    connectionService.connection.subscribe((data) => {
      const message = JSON.parse(data);

      if (message.type === 'votings'){
        this.votes.push(message.user + ' ' + message.text);
      } else if (message.type === 'newRound'){
        this.votes = [];
        this.averageEstimation = null;
        this.highestEstimation = null;
        this.lowestEstimation = null;
        this.allEstimations = [];
      } else if (message.type === 'averageEstimation'){
        this.averageEstimation = message.text;
        this.showEstimation(this.votes)
      } else if (message.type === 'highestEstimation'){
        this.highestEstimation = message.text;
      } else if (message.type === 'lowestEstimation'){
        this.lowestEstimation = message.text;
      } else if (message.type === 'estimations'){
        this.allEstimations = message.text;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.averageEstimation = null;
    this.highestEstimation = null;
    this.lowestEstimation = null;
    this.allEstimations = [];
  }


  showResults(votes): any{
    const estimations = this
      .removeUsernames(votes)
      .filter(this.removeZeros());

    this.averageEstimation = "Average Estimation: " + this.calcAverage(estimations);
    this.connectionService.connection.next( {
      type: 'averageEstimation', text: this.averageEstimation
    });

    this.highestEstimation = "Highest Estimation: " + Math.max.apply(null,estimations);
    this.connectionService.connection.next( {
      type: 'highestEstimation', text: this.highestEstimation
    });

    this.lowestEstimation = "Lowest Estimation: " + Math.min.apply(null,estimations);
    this.connectionService.connection.next( {
      type: 'lowestEstimation', text: this.lowestEstimation
    });

    this.showEstimation(this.votes);
    this.connectionService.connection.next( {
      type: 'estimations', text: this.votes
    });

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


  removeZeros() {
    return value => {
      return value > 0
    };
  }

   calcAverage(estimations){
    const average = this.calcSum(estimations) / estimations.length;
    let nextFibonacci = 0;

    this.fibonacciMaster.forEach((fibonacci) => {
      if(average <= fibonacci && nextFibonacci == 0){
        nextFibonacci = fibonacci;
      }
    });
    return nextFibonacci;
  }


   calcSum(estimations) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return estimations.reduce(reducer, 0);
  }

  private showEstimation(votes){
    this.allEstimations = votes
  }
}
