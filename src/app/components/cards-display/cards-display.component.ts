import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { GameInfoState, GameMode } from '../../store/game-info.state';
import { combineLatestWith, map } from 'rxjs';
import { Store } from '@ngxs/store';
import { Person, Starship } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GameModes } from '../../enums';

@Component({
  selector: 'app-cards-display',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './cards-display.component.html',
  styleUrl: './cards-display.component.scss'
})
export class CardsDisplayComponent implements OnInit {
  public player1Person: Person | null;
  public player2Person: Person | null;
  public player1Starship: Starship | null;
  public player2Starship: Starship | null;
  public hasPlayer1Won: boolean;
  public hasPlayer2Won: boolean;
  public isGameStarted: boolean = false;
  public gameMode: GameMode;
  private destroyedRef = inject(DestroyRef);

  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.store.select(GameInfoState.gameMode).pipe(
      combineLatestWith(this.store.select(GameInfoState.roundNumber)),
      combineLatestWith(this.store.select(GameInfoState.playerCards)),
      combineLatestWith(this.store.select(GameInfoState.playerWon)),
      map(([[[gameMode, roundNumber], cards], playerWon]) => {
        this.isGameStarted = roundNumber !== 1;
        this.gameMode = gameMode;
        this.hasPlayer1Won = playerWon.hasPlayer1Won;
        this.hasPlayer2Won = playerWon.hasPlayer2Won;

        if (gameMode === GameModes.PEOPLE) {
          this.player1Person = cards.player1Card as Person;
          this.player2Person = cards.player2Card as Person;
        } else {
          this.player1Starship = cards.player1Card as Starship;
          this.player2Starship = cards.player2Card as Starship;
        }
      }),
      takeUntilDestroyed(this.destroyedRef),
    ).subscribe();
  }
}
