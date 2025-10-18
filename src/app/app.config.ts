import { ApplicationConfig } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: true,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};