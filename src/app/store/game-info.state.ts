import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Person, Starship} from "../models";

export type GameMode = 'PEOPLE' | 'STARSHIPS';
export type RoundResult = 'PLAYER1' | 'PLAYER2' | 'DRAW';

export class UpdateScore {
  static readonly type = '[GameInfo] Update score';

  constructor(public result: RoundResult) {
  }
}

export class UpdateCards {
  static readonly type = '[GameInfo] Update cards';

  constructor(public player1Card: Person | Starship, public player2Card: Person | Starship) {
  }
}

export class IncrementRound {
  static readonly type = '[GameInfo] Increment round';
}

export class ChangeGameMode {
  static readonly type = '[GameInfo] Change game mode';

  constructor(public newMode: GameMode) {
  }
}

export interface GameInfoStateModel {
  player1Score: number;
  player2Score: number;
  player1Card: Person | Starship | null;
  player2Card: Person | Starship | null;
  roundNumber: number;
  gameMode: GameMode;
}

@State<GameInfoStateModel>({
  name: 'gameInfo',
  defaults: {
    player1Score: 0,
    player2Score: 0,
    player1Card: null,
    player2Card: null,
    roundNumber: 1,
    gameMode: 'PEOPLE'
  }
})

@Injectable()
export class GameInfoState {
  @Selector()
  static playerScores(state: GameInfoStateModel): { player1Score: number, player2Score: number } {
    return {
      player1Score: state.player1Score,
      player2Score: state.player2Score
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

  @Action(UpdateScore)
  updateScore(ctx: StateContext<GameInfoStateModel>, action: UpdateScore) {
    const state = ctx.getState();

    switch (action.result) {
      case 'PLAYER1':
        ctx.setState({
          ...state,
          player1Score: state.player1Score + 1
        });
        break;
      case 'PLAYER2':
        ctx.setState({
          ...state,
          player2Score: state.player2Score + 1
        });
        break;
      case 'DRAW':
        ctx.setState({
          ...state,
          player1Score: state.player1Score + 1,
          player2Score: state.player2Score + 1
        });
        break;
    }
  }

  @Action(IncrementRound)
  incrementRound(ctx: StateContext<GameInfoStateModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      roundNumber: state.roundNumber + 1
    });
  }

  @Action(ChangeGameMode)
  changeGameMode(ctx: StateContext<GameInfoStateModel>, action: ChangeGameMode) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      gameMode: action.newMode
    });
  }

  @Action(UpdateCards)
  updatePlayerCards(ctx: StateContext<GameInfoStateModel>, action: UpdateCards) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      player1Card: action.player1Card,
      player2Card: action.player2Card,
    });
  }
}
