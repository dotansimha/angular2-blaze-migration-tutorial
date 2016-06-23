import {Component} from "@angular/core";
import {MeteorComponent} from "angular2-meteor";
import {Lists} from "../../../imports/api/lists/lists.js";
import {Router, ROUTER_DIRECTIVES, RouteConfig} from "@angular/router-deprecated";
import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {ListShowComponent} from "./list-show.component";
import {ListRedirectorComponent} from "./list-redirector.component";

@Component({
  directives: [ROUTER_DIRECTIVES],
  templateUrl: '/client/imports/components/main-container.ng2.html'
})
@RouteConfig([
  {path: 'lists/:_id', name: 'ListShow', component: ListShowComponent },
  {path: '', name: 'ListRedirector', component: ListRedirectorComponent, useAsDefault: true}
])
export class MainContainerComponent extends MeteorComponent {
  private lists : Mongo.Cursor;
  private isCordova : boolean;
  private menuOpen : boolean = false;
  private userMenuOpen : boolean = false;

  constructor(private router : Router) {
    super();

    this.subscribe('lists.public');
    this.subscribe('lists.private');

    this.isCordova = Meteor.isCordova;

    this.autorun(() => {
      this.lists = Lists.find({ $or: [
        { userId: { $exists: false } },
        { userId: Meteor.userId() },
      ] });
    }, true);
  }

  isConnected() {
    return Meteor.status().connected;
  }

  isCurrentList(list) {
    if (this.router.currentInstruction) {
      let currentRouteParams = this.router.currentInstruction.component.params;

      return currentRouteParams._id === list._id;
    }
  }

  emailLocalPart() {
    if (Meteor.user()) {
      const email = Meteor.user().emails[0].address;

      return email.substring(0, email.indexOf('@'));
    }
    else {
      return "";
    }
  }
}