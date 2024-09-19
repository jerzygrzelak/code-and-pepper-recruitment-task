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
    // Mock the store's select method
    const mockStore = {
      select: jest.fn()
    };

    mockStore.select = jest.fn().mockImplementation((selector) => {
      if (selector === GameInfoState.roundNumber) {
        return of(2);  // Mock round number as 2
      }
      return of(0);
    });

    // Render the component with the mocked store
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    await render(RoundCounterComponent, {
      componentProviders: [{ provide: Store, useValue: mockStore }],
    });
    store = TestBed.inject(Store);
  });

  it('should display the correct round number after transformation', () => {
    // Verify the transformed round number is displayed correctly
    const roundNumberElement = screen.getByText(/Round 1/);
    expect(roundNumberElement).toBeInTheDocument();
  });

  it('should handle the first round correctly', () => {
    // Change mock to simulate first round
    const mockStore = {
      select: jest.fn().mockImplementation((selector) => {
        if (selector === GameInfoState.roundNumber) {
          return of(1);  // Mock round number as 1
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
