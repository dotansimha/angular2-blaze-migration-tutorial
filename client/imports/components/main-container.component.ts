import {Component} from "@angular/core";
import {MeteorComponent} from "angular2-meteor";
import {Lists} from "../../../imports/api/lists/lists.js";
import {Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {Mongo} from "meteor/mongo";

@Component({
  directives: [ROUTER_DIRECTIVES],
  templateUrl: '/client/imports/components/main-container.ng2.html'
})
export class MainContainerComponent extends MeteorComponent {
  private lists : Mongo.Cursor;

  constructor() {
    super();

    this.subscribe('lists.public');
    this.subscribe('lists.private');

    this.autorun(() => {
      this.lists = Lists.find({ $or: [
        { userId: { $exists: false } },
        { userId: Meteor.userId() },
      ] });
    }, true);
  }

  isConnected() {

  }

  isCurrentList() {

  }

  emailLocalPart() {

  }
}