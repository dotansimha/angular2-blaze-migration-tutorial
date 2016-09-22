import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {MeteorObservable} from "meteor-rxjs";
import {Lists} from "../../../imports/api/lists/lists";

@Component({
    template: '<blaze-template *ngIf="templateContext" name="Lists_show_page" [context]="templateContext"></blaze-template>'
})
export class ListShowComponent implements OnInit {
    private list : any;
    private todosReady : boolean = false;
    private todos : Array<any>;
    private editing : boolean = false;

    constructor(private currentRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.currentRoute.params.subscribe((params: Params) => {
            const listId = params['_id'];
            MeteorObservable.subscribe('todos.inList', listId).subscribe();

            MeteorObservable.autorun().zone().subscribe(() => {
                if (listId && Lists.findOne(listId)) {
                    this.list = Lists.findOne(listId);
                    this.todosReady = true;
                    this.todos = this.list.todos();
                }
            })
        });
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