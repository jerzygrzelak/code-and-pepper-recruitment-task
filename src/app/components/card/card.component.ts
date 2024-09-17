import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {GameMode} from "../../store/game-info.state";
import {Store} from "@ngxs/store";
import {DecimalPipe} from "@angular/common";
import {TypeofPipe} from "../../pipes/typeof.pipe";
import {Person, Starship} from "../../models";

export type Resource = Person | Starship;

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    DecimalPipe,
    TypeofPipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input()
  public resource: Resource;

  public isGameStarted: boolean = false;
  public gameMode: GameMode;
  public placeholderWidth: number = 400;
  public placeholderHeight: number = 200;

  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    // this.store.select(GameInfoState.gameMode).pipe(
    //   combineLatestWith(this.store.select(GameInfoState.roundNumber)),
    //   combineLatestWith(this.store.select(GameInfoState.playerCards)),
    //   map(([[gameMode, roundNumber], cards]) => {
    //     this.gameMode = gameMode;
    //     console.log(roundNumber)
    //     this.isGameStarted = roundNumber !== 1;
    //   })
    // ).subscribe();
  }
}

