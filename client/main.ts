import '/imports/startup/client';

import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";

@Component({
  selector: 'app',
  template: ''
})
class MainComponent {
  constructor() {}
}

bootstrap(MainComponent, []);