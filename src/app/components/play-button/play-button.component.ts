import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatFabButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { Store } from '@ngxs/store';
import { GetPeople, PersonState } from '../../store/person.state';
import { GameInfoState, StartRound } from '../../store/game-info.state';
import { GetStarships, StarshipState } from '../../store/starship.state';
import { combineLatest, map } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    NgIf,
    MatFabButton,
    MatProgressSpinner
  ],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.scss'
})
export class PlayButtonComponent implements OnInit {
  public isFirstRound: boolean = true;
  public isDataLoading: boolean = false;

  constructor(private store: Store) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new GetPeople());
    this.store.dispatch(new GetStarships());
    this.store.select(GameInfoState.roundNumber).subscribe(roundNumber => {
      this.isFirstRound = roundNumber === 1;
    });

    const people$ = this.store.select(PersonState.getAllPeople);
    const starships$ = this.store.select(StarshipState.getAllStarships);

    combineLatest([people$, starships$]).pipe(
      map(([people, starships]) => people.length > 0 && starships.length > 0)
    ).subscribe((dataLoaded: boolean) => {
      this.isDataLoading = !dataLoaded;
    });
  }

  public startRound(): void {
    this.store.dispatch(new StartRound());
  }
}
