import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {SwapiService} from "../../services/swapi.service";
import { Store} from "@ngxs/store";
import {GetPeople} from "../../store/person.state";
import {GameInfoState, IncrementRound, UpdateCards} from "../../store/game-info.state";
import {GetStarships} from "../../store/starship.state";


@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    NgIf,
    MatFabButton
  ],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.scss'
})
export class PlayButtonComponent implements OnInit {
  public starships: any[] = [];
  public errorMessage: string = '';
  public isFirstRound: boolean = true;

  constructor(private swapiService: SwapiService,
              private store: Store) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new GetPeople());
    this.store.dispatch(new GetStarships());
    this.store.select(GameInfoState.roundNumber).subscribe(roundNumber => {
      this.isFirstRound = roundNumber === 1;
    });
  }

  public startRound(): void {
    this.store.dispatch(new IncrementRound());
    this.store.dispatch(new UpdateCards())
  }
}
