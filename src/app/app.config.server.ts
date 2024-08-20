import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment.development";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
