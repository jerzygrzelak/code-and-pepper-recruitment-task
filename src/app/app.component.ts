import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScoreCounterComponent } from './components/score-counter/score-counter.component';
import { RoundCounterComponent } from './components/round-counter/round-counter.component';
import { GameModeSelectComponent } from './components/game-mode-select/game-mode-select.component';
import { PlayButtonComponent } from './components/play-button/play-button.component';
import { CardComponent } from './components/card/card.component';
import { CardsDisplayComponent } from './components/cards-display/cards-display.component';
import 'reflect-metadata';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ScoreCounterComponent,
    RoundCounterComponent,
    GameModeSelectComponent,
    PlayButtonComponent,
    CardComponent,
    CardsDisplayComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
