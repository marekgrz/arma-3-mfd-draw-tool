import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'neutralinojs-types';

if (environment.production) {
  enableProdMode();
}

if (environment.neutralino) {
  Neutralino.init();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
