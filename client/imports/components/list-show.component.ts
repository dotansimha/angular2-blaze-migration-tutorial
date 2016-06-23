import {Component} from "@angular/core";
import {RouteParams} from "@angular/router-deprecated";
import {BlazeTemplate} from "angular2-blaze-template";

@Component({
  directives: [BlazeTemplate],
  template: `<blaze-template name="Lists_show_page" [context]="templateContext"></blaze-template>`
})
export class ListShowComponent {
  private templateContext : any;

  constructor(params : RouteParams) {
    let listId = params.get("_id");

    this.templateContext = {
      _id: listId
    };
  }
}