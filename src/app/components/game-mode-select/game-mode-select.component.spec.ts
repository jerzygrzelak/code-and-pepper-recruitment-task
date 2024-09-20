// import '@testing-library/jest-dom';
// import '@angular/compiler';
// import 'zone.js';
// import { render, screen, fireEvent, prettyDOM } from '@testing-library/angular';
// import { GameModeSelectComponent } from './game-mode-select.component';
// import { GameInfoState, TriggerChangeGameMode } from '../../store/game-info.state';
// import { TestBed } from '@angular/core/testing';
// import { NgxsModule, Store } from '@ngxs/store';
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import { mockStore } from './mock-store';
// import { of } from 'rxjs'; // Import your mock store
//
// describe('GameModeSelectComponent', () => {
//   beforeAll(() => {
//     TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//   });
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [NgxsModule.forRoot([GameInfoState])],
//       providers: [
//         { provide: Store, useValue: mockStore }
//       ],
//     }).compileComponents();
//   });
//
//   it('should display the correct initial game mode', async () => {
//     // You can set the mock store state here if needed
//
//     const component = await render(GameModeSelectComponent, {
//       providers: [{ provide: Store, useValue: mockStore }],
//       imports: [NgxsModule.forRoot([GameInfoState])]
//     });
//     console.log(prettyDOM(component.container))
//
//     expect(screen.getByTestId('game-mode-select')).toHaveValue('PEOPLE');
//   });
//
//   it('should dispatch TriggerChangeGameMode action on selection change', async () => {
//     const dispatchSpy = jest.spyOn(mockStore, 'dispatch');
//     mockStore.select = (selector: any) => of('PEOPLE');
//
//     await render(GameModeSelectComponent, {
//       providers: [{ provide: Store, useValue: mockStore }],
//       imports: [NgxsModule.forRoot([GameInfoState])]
//     });
//
//     fireEvent.change(screen.getByTestId('game-mode-select'), { target: { value: 'STARSHIPS' } });
//     expect(dispatchSpy).toHaveBeenCalledWith(new TriggerChangeGameMode(true));
//   });
//
//   it('should bind gameMode to the select element', async () => {
//     mockStore.select = (selector: any) => of('STARSHIPS');
//
//     await render(GameModeSelectComponent, {
//       providers: [{ provide: Store, useValue: mockStore }],
//       imports: [NgxsModule.forRoot([GameInfoState])]
//     });
//
//     expect(screen.getByTestId('game-mode-select')).toHaveValue('STARSHIPS');
//   });
// });
