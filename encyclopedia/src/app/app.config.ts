import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"luminary-universe","appId":"1:124570023849:web:aa71e37bdedf565062f6b8","storageBucket":"luminary-universe.firebasestorage.app","apiKey":"AIzaSyBCbdHjNsm0BPhFC1ZMod_XVIlXmvDc0-U","authDomain":"luminary-universe.firebaseapp.com","messagingSenderId":"124570023849","measurementId":"G-HW37Y2D6DE"})), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, provideFirestore(() => getFirestore())]
};
