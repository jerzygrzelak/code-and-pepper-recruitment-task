import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {GameInfoState, GameMode} from "../../store/game-info.state";
import {Store} from "@ngxs/store";
import {Person, Starship} from "../../models";
import {DecimalPipe} from "@angular/common";

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
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input()
  public resource: Person & Starship;

  public gameMode: GameMode;
  public placeholderWidth: number = 400;
  public placeholderHeight: number = 200;

  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.store.select(GameInfoState.gameMode).subscribe(gameMode => {
      this.gameMode = gameMode;
    })
  }
}
