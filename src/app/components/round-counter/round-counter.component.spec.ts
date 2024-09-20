import '@testing-library/jest-dom';
import '@angular/compiler';
import 'zone.js';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { RoundCounterComponent } from './round-counter.component';
import { Store } from '@ngxs/store';
import { GameInfoState } from '../../store/game-info.state';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('RoundCounterComponent', () => {
  let store: Store;

  // beforeAll(() => {
  //   TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  // });

  beforeEach(async () => {
    const mockStore = {
      select: jest.fn()
    };

    mockStore.select = jest.fn().mockImplementation((selector) => {
      if (selector === GameInfoState.roundNumber) {
        return of(2);
      }
      return of(0);
    });

    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    await render(RoundCounterComponent, {
      componentProviders: [{ provide: Store, useValue: mockStore }],
    });
    store = TestBed.inject(Store);
  });

  it('should display the correct round number after transformation', () => {
    const roundNumberElement = screen.getByText(/Round 1/);
    expect(roundNumberElement).toBeInTheDocument();
  });

  it('should handle the first round correctly', () => {
    const mockStore = {
      select: jest.fn().mockImplementation((selector) => {
        if (selector === GameInfoState.roundNumber) {
          return of(1);
        }
        return of(0);
      })
    };

    render(RoundCounterComponent, {
      componentProviders: [{ provide: Store, useValue: mockStore }],
    });

    const roundNumberElement = screen.getByText(/Round 1/);
    expect(roundNumberElement).toBeInTheDocument();
  });
});
