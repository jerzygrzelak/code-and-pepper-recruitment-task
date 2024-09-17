import {Component, OnInit} from '@angular/core';
import {CardComponent} from "../card/card.component";
import {GameInfoState, GameMode} from "../../store/game-info.state";
import {combineLatestWith, map} from "rxjs";
import {Store} from "@ngxs/store";
import {Person, Starship} from "../../models";

@Component({
  selector: 'app-cards-display',
  standalone: true,
    imports: [
        CardComponent
    ],
  templateUrl: './cards-display.component.html',
  styleUrl: './cards-display.component.scss'
})
export class CardsDisplayComponent implements OnInit{
  public player1Card: Person | Starship | null;
  public player2Card: Person | Starship | null;
  public isGameStarted: boolean = false;
  public gameMode: GameMode;

  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.store.select(GameInfoState.gameMode).pipe(
      combineLatestWith(this.store.select(GameInfoState.roundNumber)),
      combineLatestWith(this.store.select(GameInfoState.playerCards)),
      map(([[gameMode, roundNumber], cards]) => {
        this.gameMode = gameMode;
        console.log(roundNumber)
        this.isGameStarted = roundNumber !== 1;
        this.player1Card = cards.player1Card;
        this.player2Card = cards.player2Card;
      })
    ).subscribe()
  }

}
