import {Person, Starship} from "../models";
import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {SwapiService} from "../services/swapi.service";
import {catchError, of, tap} from "rxjs";
import {SwapiGetResponse} from "../models";
import * as _ from "lodash";
import {RemoveUsedStarships, StarshipStateModel} from "./starship.state";

export class GetPeople {
  static readonly type = '[Person] Get page';
}

export class RemoveUsedPeople {
  static readonly type = '[Person] Remove used people';

  constructor(public usedPeople: Person[]) {
  }
}

export interface PersonStateModel {
  people: Person[];
  nextPage: number;
}

@State<PersonStateModel>({
  name: 'person',
  defaults: {
    people: [],
    nextPage: 1,
  }
})

@Injectable()
export class PersonState {
  constructor(private swapiService: SwapiService,
              private store: Store) {
  }

  @Selector()
  static getAllPeople(state: PersonStateModel) {
    return state.people;
  }

  @Selector()
  static getRandomPeople(state: PersonStateModel) {
    return _.sampleSize(state.people, 2);
  }

  @Action(RemoveUsedPeople)
  removeUsedPeople(ctx: StateContext<PersonStateModel>, action: RemoveUsedPeople) {
    const state = ctx.getState();
    const updatedPeople = state.people.filter(person =>
      !action.usedPeople.some(removedPerson => removedPerson.name === person.name)
    );

    if (!updatedPeople.length) {
      this.store.dispatch(new GetPeople());
    }

    ctx.setState({
      ...state,
      people: updatedPeople
    });
  }

  @Action(GetPeople)
  getPeoplePage(ctx: StateContext<PersonStateModel>) {
    const state = ctx.getState();
    const pageNumber = state.nextPage;
    const pageNumberRegex = /[?&]page=(\d*)/;

    return this.swapiService.getPeople(pageNumber).pipe(
      tap((result: SwapiGetResponse<Person>) => {
        const match = result.next?.match(pageNumberRegex);
        ctx.setState({
          ...state,
          people: result.results,
          nextPage:  match ? +match[1] || 1 : 1,
        });
      }),
      catchError((error) => {
        console.error('Error fetching people:', error);
        return of([]);
      })
    );
  }
}
