import '@testing-library/jest-dom';
import '@angular/compiler';
import 'zone.js';
import { render, screen, fireEvent } from '@testing-library/angular';
import { of } from 'rxjs';
import { PlayButtonComponent } from './play-button.component';
import { Store } from '@ngxs/store';
import { GameInfoState, StartRound } from '../../store/game-info.state';
import { PersonState } from '../../store/person.state';
import { StarshipState } from '../../store/starship.state';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('PlayButtonComponent', () => {
  let store: Store;

  const mockStore = {
    dispatch: jest.fn(),
    select: jest.fn(),
  };

  // beforeEach(() => {
  //   TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  // });

  beforeEach(async () => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

    mockStore.select = jest.fn().mockImplementation((selector) => {
      if (selector === GameInfoState.roundNumber) {
        return of(1);
      } else if (selector === PersonState.getAllPeople) {
        return of([{ name: 'Person 1' }]);
      } else if (selector === StarshipState.getAllStarships) {
        return of([{ name: 'Starship 1' }]);
      }
      return of([]);
    });

    const result = await render(PlayButtonComponent, {
      componentProviders: [{ provide: Store, useValue: mockStore }],
    });

    store = result.fixture.debugElement.injector.get(Store);
  });

  it('should render "Play" text and enable button if data is loaded', async () => {
    const playButton = await screen.findByTestId('play-button');
    expect(playButton.textContent).toContain('Play');
    expect(playButton).toBeEnabled();
  });

  it('should disable the button if data is still loading', async () => {
    mockStore.select = jest.fn().mockImplementation((selector) => {
      if (selector === GameInfoState.roundNumber) {
        return of(1);
      } else if (selector === PersonState.getAllPeople) {
        return of([]);
      } else if (selector === StarshipState.getAllStarships) {
        return of([]);
      }
      return of([]);
    });

    await render(PlayButtonComponent, {
      componentProviders: [{ provide: Store, useValue: mockStore }],
    });

    const playButton = await screen.findByTestId('play-button');
    expect(playButton).toBeDisabled();
  });

  it('should call `startRound` when button is clicked', async () => {
    const playButton = await screen.findByTestId('play-button');
    fireEvent.click(playButton);
    expect(store.dispatch).toHaveBeenCalledWith(new StartRound());
  });
});
