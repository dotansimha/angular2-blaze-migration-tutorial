import {Component} from "@angular/core";
import {MeteorComponent} from "angular2-meteor";
import {Lists} from "../../../imports/api/lists/lists.js";
import {Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";

@Component({
  directives: [ROUTER_DIRECTIVES],
  templateUrl: '/client/imports/components/main-container.ng2.html'
})
export class MainContainerComponent extends MeteorComponent {
  constructor(router : Router) {
    super();

    this.subscribe('lists.public');
    this.subscribe('lists.private');

    /*this.autorun(() => {
      if (Lists.findOne()) {
        router.navigate(['ListShow', {_id: Lists.findOne()._id}]);
      }
    });*/
  }

  isConnected() {

  }

  isCurrentList() {

  }

  emailLocalPart() {

  }
}