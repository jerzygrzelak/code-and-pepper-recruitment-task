import { of } from 'rxjs';
import { GameInfoState } from '../../store/game-info.state';
import { GameModes } from '../../enums';
export const mockStore = {
  select: (selector: any) => {
    switch (selector) {
      case GameInfoState.gameMode:
        return of(GameModes.PEOPLE);
      case GameInfoState.roundNumber:
        return of(2);
      case GameInfoState.playerCards:
        return of({
          player1Card: { name: 'Luke Skywalker', mass: 77 },
          player2Card: { name: 'Darth Vader', mass: 136 }
        });
      case GameInfoState.playerWon:
        return of({ hasPlayer1Won: true, hasPlayer2Won: false });
      default:
        return of(null);
    }
  },
  dispatch: jest.fn() // Simulate dispatch method
};
