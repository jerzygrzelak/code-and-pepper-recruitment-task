import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Person, Starship} from "../models";
import {PersonState, RemoveUsedPeople} from "./person.state";
import {RemoveUsedStarships, StarshipState} from "./starship.state";
import _ from "lodash";

export type GameMode = 'PEOPLE' | 'STARSHIPS';
export type RoundResult = 'PLAYER1' | 'PLAYER2' | 'DRAW';

export class UpdateScore {
  static readonly type = '[GameInfo] Update score';
}

export class UpdateCards {
  static readonly type = '[GameInfo] Update cards';
}

export class IncrementRound {
  static readonly type = '[GameInfo] Increment round';
}

export class ChangeGameMode {
  static readonly type = '[GameInfo] Change game mode';
}

export class TriggerChangeGameMode {
  static readonly type = '[GameInfo] Trigger change game mode';

  constructor(public trigger: boolean) {
  }
}

export interface GameInfoStateModel {
  player1Score: number;
  player2Score: number;
  player1Card: Person | Starship | null;
  player2Card: Person | Starship | null;
  roundNumber: number;
  hasPlayer1Won: boolean;
  hasPlayer2Won: boolean;
  gameMode: GameMode;
  gameModeChangeTriggered: boolean;
}

@State<GameInfoStateModel>({
  name: 'gameInfo',
  defaults: {
    player1Score: 0,
    player2Score: 0,
    player1Card: null,
    player2Card: null,
    hasPlayer1Won: false,
    hasPlayer2Won: false,
    roundNumber: 1,
    gameMode: 'PEOPLE',
    gameModeChangeTriggered: false,
  }
})

@Injectable()
export class GameInfoState {
  constructor(private store: Store) {
  }

  @Selector()
  static playerWon(state: GameInfoStateModel) {
    return {
      hasPlayer1Won: state.hasPlayer1Won,
      hasPlayer2Won: state.hasPlayer2Won,
    }
  }

  @Selector()
  static playerScores(state: GameInfoStateModel): { player1Score: number, player2Score: number } {
    return {
      player1Score: state.player1Score,
      player2Score: state.player2Score
    };
  }

  @Selector()
  static playerCards(state: GameInfoStateModel): {
    player1Card: Person | Starship | null,
    player2Card: Person | Starship | null
  } {
    return {
      player1Card: state.player1Card,
      player2Card: state.player2Card
    };
  }

  @Selector()
  static roundNumber(state: GameInfoStateModel): number {
    return state.roundNumber;
  }

  @Selector()
  static gameMode(state: GameInfoStateModel): GameMode {
    return state.gameMode;
  }

  // @Action(UpdateScore)
  // updateScore(ctx: StateContext<GameInfoStateModel>, action: UpdateScore) {
  //   const state = ctx.getState();
  //
  //   switch (action.result) {
  //     case 'PLAYER1':
  //       ctx.setState({
  //         ...state,
  //         player1Score: state.player1Score + 1
  //       });
  //       break;
  //     case 'PLAYER2':
  //       ctx.setState({
  //         ...state,
  //         player2Score: state.player2Score + 1
  //       });
  //       break;
  //     case 'DRAW':
  //       ctx.setState({
  //         ...state,
  //         player1Score: state.player1Score + 1,
  //         player2Score: state.player2Score + 1
  //       });
  //       break;
  //   }
  // }

  @Action(IncrementRound)
  incrementRound(ctx: StateContext<GameInfoStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      roundNumber: state.roundNumber + 1
    });
  }

  @Action(TriggerChangeGameMode)
  triggerChangeGameMode(ctx: StateContext<GameInfoStateModel>, action: TriggerChangeGameMode) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      gameModeChangeTriggered: action.trigger
    });
  }

  @Action(ChangeGameMode)
  changeGameMode(ctx: StateContext<GameInfoStateModel>) {
    const state = ctx.getState();
    if (state.gameModeChangeTriggered) {
      const newGameMode = state.gameMode === 'PEOPLE' ? 'STARSHIPS' : 'PEOPLE';

      ctx.setState({
        ...state,
        gameMode: newGameMode,
        gameModeChangeTriggered: false
      });
    }
  }

  @Action(UpdateCards)
  updatePlayerCards(ctx: StateContext<GameInfoStateModel>, action: UpdateCards) {
    const state = ctx.getState();
    const cards = state.gameMode === 'PEOPLE'
      ? this.store.selectSnapshot(PersonState.getRandomPeople)
      : this.store.selectSnapshot(StarshipState.getRandomStarships);

    state.gameMode === 'PEOPLE'
      ? this.store.dispatch(new RemoveUsedPeople((cards as Person[])))
      : this.store.dispatch(new RemoveUsedStarships((cards as Starship[])));

    ctx.setState({
      ...state,
      player1Card: cards[0],
      player2Card: cards[1],
    });
  }

  @Action(UpdateScore)
  updatePlayerScore(ctx: StateContext<GameInfoStateModel>) {
    const state = ctx.getState();

    const player1Card = state.player1Card;
    const player2Card = state.player2Card;

    let player1Value: number = 0;
    let player2Value: number = 0;

    if (state.gameMode === 'PEOPLE') {
      const player1Mass = (player1Card as Person).mass === 'unknown' ? '0' : (player1Card as Person).mass;
      const player2Mass = (player2Card as Person).mass === 'unknown' ? '0' : (player2Card as Person).mass;

      player1Value = parseInt(player1Mass);
      player2Value = parseInt(player2Mass);
      console.log(player1Value, player2Value);
    } else if (state.gameMode === 'STARSHIPS') {
      player1Value = parseInt((player1Card as Starship).crew);
      player2Value = parseInt((player2Card as Starship).crew);
    }

    let winner: string;

    if (player1Value > player2Value) {
      winner = 'Player 1';
    } else if (player2Value > player1Value) {
      winner = 'Player 2';
    } else {
      winner = 'Draw';
    }

    let player1Score = state.player1Score;
    let player2Score = state.player2Score;
    let hasPlayer1Won;
    let hasPlayer2Won;

    if (winner === 'Player 1') {
      player1Score += 1;
      hasPlayer1Won = true;
      hasPlayer2Won = false;
    } else if (winner === 'Player 2') {
      player2Score += 1;
      hasPlayer1Won = false;
      hasPlayer2Won = true;
    } else {
      player1Score += 1;
      player2Score += 1;
      hasPlayer1Won = true;
      hasPlayer2Won = true;
    }

    ctx.setState({
      ...state,
      player1Score: player1Score,
      player2Score: player2Score,
      hasPlayer1Won: hasPlayer1Won,
      hasPlayer2Won: hasPlayer2Won,
    });
  }
}
