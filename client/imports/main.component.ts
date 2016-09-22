import '/imports/startup/client';
import {Component, OnInit} from "@angular/core";
import {MeteorObservable} from "meteor-rxjs";

@Component({
  selector: 'app',
  template: '<router-outlet></router-outlet>'
})
export class MainComponent implements OnInit {
  constructor() {

  }

  ngOnInit() {
    MeteorObservable.subscribe("lists.public").subscribe();
    MeteorObservable.subscribe("lists.private").subscribe();
  }
}