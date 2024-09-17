import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatCard, MatCardContent} from "@angular/material/card";
import {ScoreCounterComponent} from "./components/score-counter/score-counter.component";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {RoundCounterComponent} from "./components/round-counter/round-counter.component";
import {GameModeSelectComponent} from "./components/game-mode-select/game-mode-select.component";
import {PlayButtonComponent} from "./components/play-button/play-button.component";
import {CardComponent} from "./components/card/card.component";
import {Store} from "@ngxs/store";
import {CardsDisplayComponent} from "./components/cards-display/cards-display.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
        RouterOutlet,
    MatCard,
    MatCardContent,
    ScoreCounterComponent,
    MatIcon,
    MatIconModule,
    MatFabButton,
    MatButton,
    MatRadioGroup,
    MatRadioButton,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
    RoundCounterComponent,
    GameModeSelectComponent,
    PlayButtonComponent,
    CardComponent,
    CardsDisplayComponent,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private store: Store) {
  }
  //
  // public ngOnInit(): void {
  //   this.store.dispatch()
  // }
}
