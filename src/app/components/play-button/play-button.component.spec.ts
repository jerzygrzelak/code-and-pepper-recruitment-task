import '@testing-library/jest-dom';
import '@angular/compiler';
import 'zone.js';
import { PlayButtonComponent } from './play-button.component';
import { Actions, NgxsModule, Store } from '@ngxs/store';
import { GameInfoState, StartRound } from '../../store/game-info.state';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { render, screen, fireEvent } from '@testing-library/angular';
import { Observable } from 'rxjs';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { waitFor } from '@testing-library/dom';

describe('PlayButtonComponent', () => {
  let store: Store;
  let actions$: Observable<any>;
  let component: PlayButtonComponent;
  let fixture: ComponentFixture<PlayButtonComponent>;
  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([GameInfoState]),
        PlayButtonComponent
      ]
    }).compileComponents();

    TestBed.compileComponents().then(async () => {
      fixture = TestBed.createComponent(PlayButtonComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      store = TestBed.inject(Store);
      store.reset(GameInfoState);
      actions$ = TestBed.inject(Actions);
    });
  });

  it('should display "Play" when it is the first round', () => {
    store.reset({
      ...store.snapshot(),
      gameInfo: { roundNumber: 1 }
    });
    store.dispatch(new StartRound());
    fixture.detectChanges();

    const button = screen.getByTestId('play-button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toContain('Play');
  });

  it('should display "Next round" after the first round', async() => {
    store.reset({
      gameInfo: { roundNumber: 2 }
    });
    store.dispatch(new StartRound());
    fixture.detectChanges();

    await waitFor(()=>{
      const button = screen.getByTestId('play-button');
      expect(button.textContent).toContain('Next round');
    })

  });

  it('should disable the button when data is loading', () => {
    component.isDataLoading = true;
    fixture.detectChanges();

    const button = screen.getByTestId('play-button');
    expect(button).toBeDisabled();
  });

  it('should dispatch the StartRound action when button is clicked', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const button = screen.getByTestId('play-button');
    fireEvent.click(button);

    expect(dispatchSpy).toHaveBeenCalledWith(new StartRound());
  });

  it('should display the replay icon if it is not the first round', () => {
    store.reset({
      gameInfo: { roundNumber: 2, playerCards: null }
    });

    fixture.detectChanges();

    const replayIcon = screen.getByRole('Replay icon');
    expect(replayIcon).toBeInTheDocument();
  });

  it('should hide the spinner if data is not loading', () => {
    component.isDataLoading = false;
    fixture.detectChanges();

    const spinner = screen.queryByRole('progressbar');
    expect(spinner).not.toBeInTheDocument();
  });

  it('should show the spinner if data is loading', () => {
    component.isDataLoading = true;
    fixture.detectChanges();

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });
});
