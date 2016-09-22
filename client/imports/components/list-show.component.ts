import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MeteorObservable} from "meteor-rxjs";
import {Lists} from "../../../imports/api/lists/lists";
import {
  updateName,
  makePublic,
  makePrivate,
  remove,
  insert,
} from '../../../imports/api/todos/methods';
import { displayError } from '../../../imports/ui/lib/errors';
import {Observable} from "rxjs";

@Component({
    templateUrl: '/client/imports/components/list-show.html'
})
export class ListShowComponent implements OnInit {
    private list : any;
    private todosReady : boolean = false;
    private todos : Observable<any>;
    private editing : boolean = false;
    private editModel : any;
    private newItemModel : string = '';
    private editingTodo : number | boolean;

    constructor(private currentRoute: ActivatedRoute, private router: Router) {
        this.editModel = {
            name: ''
        }
    }

    ngOnInit() {
        this.currentRoute.params.subscribe((params: Params) => {
            const listId = params['_id'];
            MeteorObservable.subscribe('todos.inList', listId).zone().subscribe();

            MeteorObservable.autorun().zone().subscribe(() => {
                if (listId && Lists.findOne(listId)) {
                    this.list = Lists.findOne(listId);
                    this.todosReady = true;
                    this.todos = this.list.todos().zone();
                }
            })
        });
    }

    deleteList() {
        const list = this.list;
        const message = `Are you sure you want to delete the list?`;

        if (confirm(message)) {
            remove.call({
                listId: list._id,
            }, displayError);

            this.router.navigate(['Home']);

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

    onTodoItemEditChange(event) {
        if (event.editing) {
            this.editingTodo = event.todoId;
        }
        else {
            this.editingTodo = false;
        }
    }
}