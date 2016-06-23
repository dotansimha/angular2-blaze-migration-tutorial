import {Component} from "@angular/core";
import {Router} from "@angular/router-deprecated";
import {Lists} from "../../../imports/api/lists/lists.js";
import {MeteorComponent} from "angular2-meteor/build/index";

@Component({
  directives: [],
  template: 'T'
})
export class ListRedirectorComponent extends MeteorComponent {
  constructor(router : Router) {
    super();

    this.autorun(() => {
      if (Lists.findOne()) {
        router.navigate(['ListShow', {_id: Lists.findOne()._id}]);
      }
    }, true);
  }
}