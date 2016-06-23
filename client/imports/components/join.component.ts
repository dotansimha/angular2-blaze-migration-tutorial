import {Component} from "@angular/core";
import {MeteorComponent} from "angular2-meteor/build/index";

@Component({
  directives: [],
  templateUrl: '/client/imports/components/join.ng2.html'
})
export class JoinComponent extends MeteorComponent {
  constructor() {
    super();
  }
}