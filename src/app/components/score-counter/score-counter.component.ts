import { Component } from '@angular/core';

@Component({
  selector: 'app-score-counter',
  standalone: true,
  imports: [],
  templateUrl: './score-counter.component.html',
  styleUrl: './score-counter.component.scss'
})
export class ScoreCounterComponent {
  public player1Score: number = 0;
  public player2Score: number = 0;
}
