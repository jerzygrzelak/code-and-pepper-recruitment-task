import '@testing-library/jest-dom';
import '@angular/compiler';
import 'zone.js';
import { render, screen } from '@testing-library/angular';
import { CardsDisplayComponent } from './cards-display.component';
import { CardComponent } from '../card/card.component';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { GameInfoState } from '../../store/game-info.state';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { GameModes } from '../../enums';

const mockStore = {
  select: (selector: any) => {
    switch (selector) {
      case GameInfoState.gameMode:
        return of(GameModes.PEOPLE);
      case GameInfoState.roundNumber:
        return of(2);
      case GameInfoState.playerCards:
        return of({
          player1Card: {name: 'Luke Skywalker', mass: 77},
          player2Card: {name: 'Darth Vader', mass: 136}
        });
      case GameInfoState.playerWon:
        return of({hasPlayer1Won: true, hasPlayer2Won: false});
      default:
        return of(null);
    }
  }
};

describe('CardsDisplayComponent', () => {
  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  it('should render two cards and VS caption', async () => {
    await render(CardsDisplayComponent, {
      imports: [CardComponent],
      providers: [
        {provide: Store, useValue: mockStore}
      ]
    });

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(2);

    const vsCaption = screen.getByText('VS');
    expect(vsCaption).toBeInTheDocument();
  });
});
