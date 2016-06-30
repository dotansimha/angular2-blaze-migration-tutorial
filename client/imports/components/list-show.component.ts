import {Component} from "@angular/core";
import {RouteParams, Router} from "@angular/router-deprecated";
import {Lists} from "../../../imports/api/lists/lists.js"
import {MeteorComponent} from "angular2-meteor";
import {
  updateName,
  makePublic,
  makePrivate,
  remove,
} from '../../../imports/api/lists/methods.js';

import {
  insert,
} from '../../../imports/api/todos/methods.js';

import { displayError } from '../../../imports/errors.js';
import {ListItem} from "./list-item.component";

@Component({
  directives: [ListItem],
  templateUrl: '/client/imports/components/list-show.html'
})
export class ListShowComponent extends MeteorComponent {
  private list : any;
  private todosReady : boolean = false;
  private todos : Array<any>;
  private editing : boolean = false;
  private editModel : any;
  private newItemModel : string = '';
  private editingTodo : number | boolean;

  constructor(params : RouteParams, private router : Router) {
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

    this.editModel = {
      name: ''
    }
  }

  onTodoItemEditChange(event) {
    if (event.editing) {
      this.editingTodo = event.todoId;
    }
    else {
      this.editingTodo = false;
    }
  }

  deleteList() {
    const list = this.list;
    const message = `Are you sure you want to delete the list?`;

    if (confirm(message)) {
      remove.call({
        listId: list._id,
      }, displayError);

      this.router.root.navigate(['Home']);

      return true;
    }

    return false;
  }

  editList(toggle) {
    this.editModel.name = this.list.name;
    this.editing = toggle;
  }

  toggleListPrivacy() {
    const list = this.list;

    if (list.userId) {
      makePublic.call({ listId: list._id }, displayError);
    } else {
      makePrivate.call({ listId: list._id }, displayError);
    }
  }

  addNew() {
    if (this.newItemModel == '') {
      return;
    }

    insert.call({
      listId: this.list._id,
      text: this.newItemModel,
    }, displayError);

    this.newItemModel = '';
  }

  saveList() {
    if (this.editing) {
      updateName.call({
        listId: this.list._id,
        newName: this.editModel.name,
      }, displayError);

      this.editing = false;
    }
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