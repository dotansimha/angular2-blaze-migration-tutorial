import {Component} from "@angular/core";
import {MeteorComponent} from "angular2-meteor";
import {Lists} from "../../../imports/api/lists/lists.js";
import {Router, ROUTER_DIRECTIVES, RouteConfig} from "@angular/router-deprecated";
import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {ListShowComponent} from "./list-show.component";
import {ListRedirectorComponent} from "./list-redirector.component";
import {JoinComponent} from "./join.component";
import {SigninComponent} from "./signin.component";
import { insert } from '../../../imports/api/lists/methods.js';


@Component({
  directives: [ROUTER_DIRECTIVES],
  templateUrl: '/client/imports/components/main-container.html'
})
@RouteConfig([
  {path: 'lists/:_id', name: 'ListShow', component: ListShowComponent },
  {path: '', name: 'ListRedirector', component: ListRedirectorComponent, useAsDefault: true},
  {path: 'join', name: 'Join', component: JoinComponent},
  {path: 'signin', name: 'Signin', component: SigninComponent}
])
export class MainContainerComponent extends MeteorComponent {
  private lists : Mongo.Cursor;
  private isCordova : boolean;
  private menuOpen : boolean = false;
  private userMenuOpen : boolean = false;
  private currentUser : Meteor.User;

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

      this.currentUser = Meteor.user();
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

  addNewList() {
    const listId = insert.call((err) => {
      if (err) {
        this.router.navigate(['Home']);
        alert('Could not create list.');
      }
    });

    this.router.navigate(['ListShow', {_id: listId}]);
  }

  logout() {
    Meteor.logout();

    if (this.router.currentInstruction) {
      let currentRouteParams = this.router.currentInstruction.component.params;

      if (currentRouteParams._id) {
        const list = Lists.findOne(currentRouteParams._id);

        if (list.userId) {
          this.router.navigate(['ListShow', {_id: Lists.findOne({ userId: { $exists: false } })._id}]);
        }
      }
    }
  }
}