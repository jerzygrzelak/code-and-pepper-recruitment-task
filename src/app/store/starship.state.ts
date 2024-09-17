import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {SwapiService} from "../services/swapi.service";
import {catchError, of, tap} from "rxjs";
import {SwapiGetResponse} from "../models";
import {Starship} from "../models";
import * as _ from "lodash";
import {GetPeople, PersonStateModel} from "./person.state";

export class GetStarships {
  static readonly type = '[Starship] Get page';
}

export class RemoveUsedStarships {
  static readonly type = '[Starship] Remove used starships';

  constructor(public usedStarships: Starship[]) {
  }
}

export interface StarshipStateModel {
  starships: Starship[];
  nextPage: number;
}

@State<StarshipStateModel>({
  name: 'starship',
  defaults: {
    starships: [],
    nextPage: 1,
  }
})

@Injectable()
export class StarshipState {
  constructor(private swapiService: SwapiService,
              private store: Store) {
  }

  @Selector()
  static getAllStarships(state: StarshipStateModel) {
    return state.starships;
  }

  @Selector()
  static getRandomStarships(state: StarshipStateModel) {
    return _.sampleSize(state.starships, 2);
  }

  @Action(RemoveUsedStarships)
  removeUsedStarships(ctx: StateContext<StarshipStateModel>, action: RemoveUsedStarships) {
    const state = ctx.getState();
    const updatedStarships = state.starships.filter(starship =>
      !action.usedStarships.some(removedStarship => removedStarship.name === starship.name)
    );

    if (!updatedStarships.length) {
      this.store.dispatch(new GetStarships());
    }

    ctx.setState({
      ...state,
      starships: updatedStarships
    });
  }

  @Action(GetStarships)
  getPeoplePage(ctx: StateContext<StarshipStateModel>) {
    const state = ctx.getState();
    const pageNumber = state.nextPage;
    const pageNumberRegex = /[?&]page=(\d*)/;

    return this.swapiService.getStarships(pageNumber).pipe(
      tap((result: SwapiGetResponse<Starship>) => {
        const match = result.next?.match(pageNumberRegex);
        ctx.setState({
          ...state,
          starships: result.results,
          nextPage: match ? +match[1] || 1 : 1,
        });
      }),
      catchError((error) => {
        console.error('Error fetching starships:', error);
        return of([]);
      })
    );
  }


}
