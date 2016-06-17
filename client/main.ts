import '/imports/startup/client';

import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig} from "@angular/router-deprecated";

@Component({
  selector: "app",
  directives: [ROUTER_DIRECTIVES],
  template: `<router-outlet></router-outlet>`,
})
@RouteConfig([
  {path: '/', name: 'Home', component: MainContainerComponent },
  {path: '/lists/:_id', name: 'ListShow', component: ListShowComponent }
])
class MainComponent {
  constructor() {}
}

bootstrap(MainComponent, [ROUTER_PROVIDERS]);