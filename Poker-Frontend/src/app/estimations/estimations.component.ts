import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {ConnectionService} from "../connection.service";

@Component({
  selector: 'app-estimations',
  templateUrl: './estimations.component.html',
  styleUrls: ['./estimations.component.css']
})
export class EstimationsComponent implements OnInit, OnChanges {

  @Input() votes;
  @Input() resetValues;
  public averageEstimation: number;



  constructor(private connectionService: ConnectionService) {

    connectionService.wss2.subscribe((data) => {
      const message = JSON.parse(data);

      if (message.type === 'votings'){
        this.votes.push(message.user + ' ' + message.text);
      } else if (message.type === 'newRound'){
        this.votes = [];
        this.averageEstimation = null;
      } else if (message.type === 'averageEstimation'){
        this.averageEstimation = message.text;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.averageEstimation = this.resetValues
  }


  showResults(votes): any{
    const estimations = this
      .removeUsernames(votes)
      .filter(this.removeZeros());
    this.averageEstimation = this.calcAverage(estimations);

    this.connectionService.wss2.next( {
      type: 'averageEstimation', text: this.averageEstimation
    });


  }


  private removeUsernames(votes) {
    return votes.map(singleVote => {
      if (typeof singleVote === 'string') {
        return parseInt(singleVote.slice(-1))
      } else {
        return singleVote;
      }
    });
  }


  private removeZeros() {
    return value => {
      return value > 0
    };
  }

  private calcAverage(estimations){
    const average = this.calcSum(estimations) / estimations.length;
    const fibonacci:number[] = [0, 1, 2, 3, 5, 8];
    let nextFibonacci = 0;

    fibonacci.forEach((fibonacci) => {
      if(average <= fibonacci && nextFibonacci == 0){
        nextFibonacci = fibonacci;
      }
    });
    return nextFibonacci;
  }


  private calcSum(estimations) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return estimations.reduce(reducer, 0);
  }
}
