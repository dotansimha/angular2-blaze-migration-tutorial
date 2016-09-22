import 'reflect-metadata';
import 'zone.js/dist/zone.js';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppModule} from "./imports/app.module";

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);