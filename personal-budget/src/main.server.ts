import { bootstrapApplication } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';

const bootstrap = () => bootstrapApplication(App, {
  providers: [
    provideServerRendering(), 
    provideHttpClient(withFetch()),
    provideRouter(routes),
  ]
});

export default bootstrap;