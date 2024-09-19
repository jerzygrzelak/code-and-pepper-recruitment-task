import '@testing-library/jest-dom';
import '@angular/compiler';
import 'zone.js';
import { Person, Starship } from '../../models';
import { CardComponent } from './card.component';
import { render, screen } from '@testing-library/angular';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { GameModes } from '../../enums';

const mockPerson: Person = {
  name: 'Luke Skywalker',
  mass: 77,
  height: '172',
  birth_year: '19BBY',
  gender: 'male'
};

const mockStarship: Starship = {
  name: 'Millennium Falcon',
  model: 'Falcon 24X',
  crew: 4,
  passengers: '6',
  manufacturer: 'Corellian Engineering Corporation',
  cost_in_credits: '100000'
};

describe('CardComponent', () => {
  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  it('should display the "Press Play to start!" message when the game has not started', async () => {
    await render(CardComponent, {
      inputs: {
        isGameStarted: false,
        gameMode: GameModes.PEOPLE,
        person: null,
        starship: null,
        borderHighlight: false,
      }
    });

    expect(screen.getByTestId('mat-card-title').textContent).toContain('Press Play to start!');
  });

  it('should display the Star Wars logo when the game has not started', async () => {
    await render(CardComponent, {
      inputs: {
        isGameStarted: false,
        gameMode: GameModes.PEOPLE,
        person: null,
        starship: null,
        borderHighlight: false,
      }
    });

    expect(screen.getByAltText('Star Wars logo')).toBeTruthy();
  });

  it('should display person details in PEOPLE mode when the game has started', async () => {
    await render(CardComponent, {
      inputs: {
        isGameStarted: true,
        gameMode: GameModes.PEOPLE,
        person: mockPerson,
        starship: null,
        borderHighlight: false,
      }
    });

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByTestId('mass')).toHaveTextContent('Mass: 77kg');
    expect(screen.getByTestId('height')).toHaveTextContent('Height: 1.72m');
    expect(screen.getByTestId('birth-year')).toHaveTextContent('Birth year: 19BBY');
    expect(screen.getByTestId('gender')).toHaveTextContent('Gender: male');
  });

  it('should display starship details in STARSHIP mode when the game has started', async () => {
    await render(CardComponent, {
      inputs: {
        isGameStarted: true,
        gameMode: 'STARSHIPS',
        person: null,
        starship: mockStarship,
        borderHighlight: false,
      }
    });

    expect(screen.getByText('Millennium Falcon')).toBeInTheDocument();
    expect(screen.getByTestId('crew')).toHaveTextContent('Crew: 4');
    expect(screen.getByTestId('passengers')).toHaveTextContent('Passengers: 6');
    expect(screen.getByTestId('manufacturer')).toHaveTextContent('Manufacturer: Corellian Engineering Corporation');
    expect(screen.getByTestId('price')).toHaveTextContent('Price: ᖬ100000');
  });

  it('should highlight the card border if borderHighlight is true', async () => {
    await render(CardComponent, {
      inputs: {
        isGameStarted: true,
        gameMode: GameModes.PEOPLE,
        person: mockPerson,
        starship: null,
        borderHighlight: true,
      }
    });

    const card = screen.getByTestId('mat-card');
    expect(card).toHaveClass('winner-highlight');
  });
});
