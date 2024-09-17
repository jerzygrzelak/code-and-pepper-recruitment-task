import {Component, Input, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {GameInfoState, GameMode} from "../../store/game-info.state";
import {Store} from "@ngxs/store";
import {DecimalPipe} from "@angular/common";
import {TypeofPipe} from "../../pipes/typeof.pipe";
import {Person, Starship} from "../../models";

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
  public person: Person | null;

  @Input()
  public starship: Starship | null;

  @Input()
  public isGameStarted: boolean = false;

  @Input()
  public gameMode: GameMode;

  @Input()
  public borderHighlight: any;

  public placeholderWidth: number = 250;
  public placeholderHeight: number = 125;

  constructor(private store: Store) {
  }

  public ngOnInit(): void {}
}
