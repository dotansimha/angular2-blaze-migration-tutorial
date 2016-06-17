import {Component} from "@angular/core";
import {RouteParams} from "@angular/router-deprecated";

@Component({
  template: 'Hello ListShow!'
})
export class ListShowComponent {
  constructor(params : RouteParams) {
    let listId = params.get("_id");
  }
}