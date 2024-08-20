import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { FIREBASE_OPTIONS } from "@angular/fire/compat";

import { environment } from "../environments/environment.development";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(), {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebase
    }, provideAnimationsAsync()
  ]
};
