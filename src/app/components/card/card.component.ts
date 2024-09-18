import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { GameMode } from '../../store/game-info.state';
import { DecimalPipe } from '@angular/common';
import { Person, Starship } from '../../models';

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
export class CardComponent {
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
}
