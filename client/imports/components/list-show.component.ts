import {Component} from "@angular/core";
import {RouteParams} from "@angular/router-deprecated";
import {BlazeTemplate} from "angular2-blaze-template";
import {Lists} from "../../../imports/api/lists/lists.js"
import {MeteorComponent} from "angular2-meteor";

@Component({
  directives: [BlazeTemplate],
  templateUrl: '/client/imports/components/list-show.ng2.html'
})
export class ListShowComponent extends MeteorComponent {
  private list : any;
  private todosReady : boolean = false;
  private todos : Array<any>;
  private editing : boolean = false;

  constructor(params : RouteParams) {
    super();

    let listId = params.get("_id");
    this.subscribe('todos.inList', listId);

    this.autorun(() => {
      if (listId && Lists.findOne(listId)) {
        this.list = Lists.findOne(listId);
        this.todosReady = true;
        this.todos = this.list.todos();
      }
    }, true);
  }

  getContextForItem(todo) {
    return {
      todo: todo,
      editing: false,
      onEditingChange(editing) {

      },
    }
  }
}