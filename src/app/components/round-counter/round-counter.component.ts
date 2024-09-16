import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {GameInfoState} from "../../store/game-info.state";
import {AsyncPipe} from "@angular/common";

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

  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.roundNumber$ = this.store.select(GameInfoState.roundNumber);
  }
}

