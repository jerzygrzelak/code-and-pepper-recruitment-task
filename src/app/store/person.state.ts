import {Person} from "../models";
import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {SwapiService} from "../services/swapi.service";
import {catchError, of, tap} from "rxjs";
import {SwapiGetResponse} from "../models";

export class GetPeople {
  static readonly type = '[Person] Get page';
}

export interface PersonStateModel {
  people: Person[];
  nextPage: string | null;
}

@State<PersonStateModel>({
  name: 'person',
  defaults: {
    people: [],
    nextPage: '',
  }
})

@Injectable()
export class PersonState {
  constructor(private swapiService: SwapiService) {
  }

  @Action(GetPeople)
  getPeoplePage(ctx: StateContext<PersonStateModel>) {
    return this.swapiService.getPeople().pipe(
      tap((result: SwapiGetResponse<Person>) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          people: result.results,
          nextPage: result.next,
        });
      }),
      catchError((error) => {
        console.error('Error fetching people:', error);
        return of([]);
      })
    );
  }
}