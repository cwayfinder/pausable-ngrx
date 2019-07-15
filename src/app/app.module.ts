import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActionReducerMap, ActionsSubject, StoreModule } from '@ngrx/store';
import { AppState, reducers } from './state/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { PausableActionsSubject } from './state/pausable-actions-subject';

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Registered Reducers', {
  factory: () => reducers
});

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(REDUCER_TOKEN, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    PausableActionsSubject,
    { provide: ActionsSubject, useExisting: PausableActionsSubject }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
