import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {SwapiService} from "../services/swapi.service";
import {catchError, of, tap} from "rxjs";
import {SwapiGetResponse} from "../models";
import {Starship} from "../models";
import * as _ from "lodash";
import {PersonStateModel} from "./person.state";

export class GetStarships {
  static readonly type = '[Starship] Get page';
}

export interface StarshipStateModel {
  starships: Starship[];
  nextPage: string | null;
}

@State<StarshipStateModel>({
  name: 'starship',
  defaults: {
    starships: [],
    nextPage: '',
  }
})

@Injectable()
export class StarshipState {
  constructor(private swapiService: SwapiService) {
  }

  @Selector()
  static getRandomStarships(state: StarshipStateModel) {
    return _.sampleSize(state.starships, 2);
  }

  @Action(GetStarships)
  getPeoplePage(ctx: StateContext<StarshipStateModel>) {
    return this.swapiService.getStarships().pipe(
      tap((result: SwapiGetResponse<Starship>) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          starships: result.results,
          nextPage: result.next,
        });
      }),
      catchError((error) => {
        console.error('Error fetching starships:', error);
        return of([]);
      })
    );
  }
}
