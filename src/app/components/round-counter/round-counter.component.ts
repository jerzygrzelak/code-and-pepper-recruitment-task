import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { GameInfoState } from '../../store/game-info.state';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-round-counter',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './round-counter.component.html',
  styleUrl: './round-counter.component.scss'
})
export class RoundCounterComponent implements OnInit {
  public roundNumber$?: Observable<number>;
  public displayRoundNumber$: Observable<number>;

  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.roundNumber$ = this.store.select(GameInfoState.roundNumber);

    this.displayRoundNumber$ = this.roundNumber$.pipe(
      map(roundNumber => roundNumber > 1 ? roundNumber - 1 : roundNumber)
    );
  }
}

