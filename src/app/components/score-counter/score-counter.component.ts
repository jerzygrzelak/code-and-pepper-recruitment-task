import {Component, OnInit} from '@angular/core';
import {GameInfoState} from "../../store/game-info.state";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-score-counter',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './score-counter.component.html',
  styleUrl: './score-counter.component.scss'
})
export class ScoreCounterComponent implements OnInit {
  public playerScores$: Observable<{player1Score: number, player2Score: number}>;

  constructor(private store: Store) {}

  public ngOnInit(): void {
    this.playerScores$ = this.store.select(GameInfoState.playerScores);
  }
}
