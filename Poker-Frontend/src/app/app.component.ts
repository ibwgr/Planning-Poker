import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Poker-Frontend';
  fibonacciMaster:number[] = [1, 2, 3, 5, 8, 0];
}
