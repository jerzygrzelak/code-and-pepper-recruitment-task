import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {withNgxsReduxDevtoolsPlugin} from '@ngxs/devtools-plugin';
import {withNgxsFormPlugin} from '@ngxs/form-plugin';
import {withNgxsLoggerPlugin} from '@ngxs/logger-plugin';
import {withNgxsRouterPlugin} from '@ngxs/router-plugin';
import {provideStore} from '@ngxs/store';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {PersonState} from "./store/person.state";
import {GameInfoState} from "./store/game-info.state";
import {StarshipState} from "./store/starship.state";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    provideStore(
      [
        PersonState,
        StarshipState,
        GameInfoState
      ],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsFormPlugin(),
      // withNgxsLoggerPlugin(),
      withNgxsRouterPlugin(),

    )
  ]
};
