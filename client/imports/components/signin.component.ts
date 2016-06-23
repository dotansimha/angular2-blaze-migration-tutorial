import {Component} from "@angular/core";
import {MeteorComponent} from "angular2-meteor/build/index";

@Component({
  directives: [],
  template: 'Signin!'
})
export class SigninComponent extends MeteorComponent {
  constructor() {
    super();
  }
}