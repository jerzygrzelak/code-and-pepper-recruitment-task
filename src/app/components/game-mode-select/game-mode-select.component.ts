import {Component, Input, OnInit} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {Store} from "@ngxs/store";
import {ChangeGameMode, GameInfoState, GameMode, TriggerChangeGameMode} from "../../store/game-info.state";

@Component({
  selector: 'app-game-mode-select',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel,
  ],
  templateUrl: './game-mode-select.component.html',
  styleUrl: './game-mode-select.component.scss'
})
export class GameModeSelectComponent implements OnInit{
  public gameMode: GameMode;

  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.store.select(GameInfoState.gameMode).subscribe(gameMode => {
      this.gameMode = gameMode;
    })
  }

  public onGameModeChange(newGameMode: GameMode): void {
    this.store.dispatch(new TriggerChangeGameMode(true));
  }
}
