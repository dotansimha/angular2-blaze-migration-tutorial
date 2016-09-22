import '/imports/startup/client';
import {Component, OnInit} from "@angular/core";
import {MeteorObservable} from "meteor-rxjs";
import {Meteor} from "meteor/meteor";

@Component({
  selector: 'app',
  templateUrl: '/client/imports/main-component.html'
})
export class MainComponent implements OnInit {
  private isCordova : boolean;
  private menuOpen : boolean = false;
  private userMenuOpen : boolean = false;

  constructor() {
    this.isCordova = Meteor.isCordova;
  }

  ngOnInit() {
    MeteorObservable.subscribe("lists.public").subscribe();
    MeteorObservable.subscribe("lists.private").subscribe();
  }

  isConnected() {
    return true;
  }

  get userEmail() {
    return "";
  }
}