import '/imports/startup/client';
import {Component, OnInit} from "@angular/core";
import {Meteor} from "meteor/meteor";
import {MeteorObservable} from "meteor-rxjs";
import {Observable} from "rxjs";
import {Lists} from "../../imports/api/lists/lists";

@Component({
  selector: 'app',
  templateUrl: '/client/imports/main-component.html'
})
export class MainComponent implements OnInit {
  private isCordova : boolean;
  private menuOpen : boolean = false;
  private userMenuOpen : boolean = false;
  private lists: Observable<any>;

  constructor() {
    this.isCordova = Meteor.isCordova;
  }

  ngOnInit() {
    MeteorObservable.subscribe("lists.public").subscribe();
    MeteorObservable.subscribe("lists.private").subscribe();

    MeteorObservable.autorun().zone().subscribe(() => {
      this.lists = Lists.find({
        $or: [
          {userId: {$exists: false}},
          {userId: Meteor.userId()},
        ]
      }).zone();
    });
  }

  isConnected() {
    return Meteor.status().connected;
  }

  get userEmail() {
    if (Meteor.user()) {
      const email = Meteor.user().emails[0].address;

      return email.substring(0, email.indexOf('@'));
    }
    else {
      return "";
    }
  }
}