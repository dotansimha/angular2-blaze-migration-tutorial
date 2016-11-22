[{]: <region> (header)
# Step 12: Migrate the Todo List
[}]: #
[{]: <region> (body)
So let's continue! now we will migrate the list of todo, so far we use an existing Blaze Template called `Lists_show_page` inside a new Angular 2 Component called `ListShowComponent`.

First, let's modify the template, we use the same techniques we learned in the previous steps - we will use the existing template and just change the events, bindings and directives:

[{]: <helper> (diff_step 12.1)
#### Step 12.1: Migrate the list_show template

##### Added client/imports/components/list-show.ng2.html
```diff
@@ -0,0 +1,65 @@
+┊  ┊ 1┊<div class="page lists-show">
+┊  ┊ 2┊    <nav class="js-title-nav" *ngIf="list">
+┊  ┊ 3┊        <form *ngIf="editing" class="js-edit-form list-edit-form">
+┊  ┊ 4┊            <input type="text" name="name" [value]="editModel.name">
+┊  ┊ 5┊            <div class="nav-group right">
+┊  ┊ 6┊                <a href="#" class="js-cancel nav-item">
+┊  ┊ 7┊                    <span class="icon-close js-cancel" title="Cancel"></span>
+┊  ┊ 8┊                </a>
+┊  ┊ 9┊            </div>
+┊  ┊10┊        </form>
+┊  ┊11┊        <div *ngIf="!editing">
+┊  ┊12┊            <div class="nav-group">
+┊  ┊13┊                <a href="#" class="js-menu nav-item">
+┊  ┊14┊                    <span class="icon-list-unordered" title="Show Menu"></span>
+┊  ┊15┊                </a>
+┊  ┊16┊            </div>
+┊  ┊17┊
+┊  ┊18┊            <h1 class="js-edit-list title-page">
+┊  ┊19┊                <span class="title-wrapper">{{list.name}}</span>
+┊  ┊20┊                <span class="count-list">{{list.incompleteCount}}</span>
+┊  ┊21┊            </h1>
+┊  ┊22┊
+┊  ┊23┊            <div class="nav-group right">
+┊  ┊24┊                <div class="nav-item options-mobile">
+┊  ┊25┊                    <select class="list-edit">
+┊  ┊26┊                        <option disabled selected>Select an action</option>
+┊  ┊27┊                        <option *ngIf="list.userId" value="public">Make Public</option>
+┊  ┊28┊                        <option *ngIf="!list.userId" value="private">Make Private</option>
+┊  ┊29┊                        <option value="delete">Delete</option>
+┊  ┊30┊                    </select>
+┊  ┊31┊                    <span class="icon-cog"></span>
+┊  ┊32┊                </div>
+┊  ┊33┊                <div class="options-web">
+┊  ┊34┊                    <a class="js-toggle-list-privacy nav-item">
+┊  ┊35┊                        <span *ngIf="list.userId" class="icon-lock" title="Make list public"></span>
+┊  ┊36┊                        <span *ngIf="!list.userId" class="icon-unlock" title="Make list private"></span>
+┊  ┊37┊                    </a>
+┊  ┊38┊                    <a class="js-delete-list nav-item">
+┊  ┊39┊                        <span class="icon-trash" title="Delete list"></span>
+┊  ┊40┊                    </a>
+┊  ┊41┊                </div>
+┊  ┊42┊            </div>
+┊  ┊43┊        </div>
+┊  ┊44┊
+┊  ┊45┊        <form class="js-todo-new todo-new input-symbol">
+┊  ┊46┊            <input type="text" placeholder="Type to add new tasks">
+┊  ┊47┊            <span class="icon-add js-todo-add"></span>
+┊  ┊48┊        </form>
+┊  ┊49┊    </nav>
+┊  ┊50┊
+┊  ┊51┊    <div class="content-scrollable list-items">
+┊  ┊52┊        <div *ngIf="todosReady">
+┊  ┊53┊            <div *ngFor="let todo of todos">
+┊  ┊54┊                <blaze-template name="Todos_item" [context]="getContextForItem(todo)"></blaze-template>
+┊  ┊55┊            </div>
+┊  ┊56┊            <div class="wrapper-message" *ngIf="!todos || todos.length == 0">
+┊  ┊57┊                <div class="title-message">No tasks here</div>
+┊  ┊58┊                <div class="subtitle-message">Add new tasks using the field above</div>
+┊  ┊59┊            </div>
+┊  ┊60┊        </div>
+┊  ┊61┊        <div *ngIf="!todosReady" class="wrapper-message">
+┊  ┊62┊            <div class="title-message">Loading tasks...</div>
+┊  ┊63┊        </div>
+┊  ┊64┊    </div>
+┊  ┊65┊</div>🚫↵
```
[}]: # 

And because we are using RxJS Observable as a wrapper for our data, we need to add `async` Pipe in our view, and let's migrate the Template code into a Component

[{]: <helper> (diff_step 12.2)
#### Step 12.2: Added logic for the list show component

##### Changed client/imports/components/list-show.component.ts
```diff
@@ -1,11 +1,16 @@
 ┊ 1┊ 1┊import {Component, OnInit} from "@angular/core";
 ┊ 2┊ 2┊import {ActivatedRoute, Params} from "@angular/router";
+┊  ┊ 3┊import {MeteorObservable} from "meteor-rxjs";
+┊  ┊ 4┊import {Lists} from "../../../imports/api/lists/lists";
 ┊ 3┊ 5┊
 ┊ 4┊ 6┊@Component({
 ┊ 5┊ 7┊    template: '<blaze-template *ngIf="templateContext" name="Lists_show_page" [context]="templateContext"></blaze-template>'
 ┊ 6┊ 8┊})
 ┊ 7┊ 9┊export class ListShowComponent implements OnInit {
-┊ 8┊  ┊    private templateContext: any;
+┊  ┊10┊    private list : any;
+┊  ┊11┊    private todosReady : boolean = false;
+┊  ┊12┊    private todos : Array<any>;
+┊  ┊13┊    private editing : boolean = false;
 ┊ 9┊14┊
 ┊10┊15┊    constructor(private currentRoute: ActivatedRoute) {
 ┊11┊16┊
```
```diff
@@ -14,10 +19,25 @@
 ┊14┊19┊    ngOnInit() {
 ┊15┊20┊        this.currentRoute.params.subscribe((params: Params) => {
 ┊16┊21┊            const listId = params['_id'];
+┊  ┊22┊            MeteorObservable.subscribe('todos.inList', listId).subscribe();
 ┊17┊23┊
-┊18┊  ┊            this.templateContext = {
-┊19┊  ┊                _id: listId
-┊20┊  ┊            };
+┊  ┊24┊            MeteorObservable.autorun().zone().subscribe(() => {
+┊  ┊25┊                if (listId && Lists.findOne(listId)) {
+┊  ┊26┊                    this.list = Lists.findOne(listId);
+┊  ┊27┊                    this.todosReady = true;
+┊  ┊28┊                    this.todos = this.list.todos();
+┊  ┊29┊                }
+┊  ┊30┊            })
 ┊21┊31┊        });
 ┊22┊32┊    }
+┊  ┊33┊
+┊  ┊34┊    getContextForItem(todo) {
+┊  ┊35┊        return {
+┊  ┊36┊              todo: todo,
+┊  ┊37┊              editing: false,
+┊  ┊38┊              onEditingChange(editing) {
+┊  ┊39┊
+┊  ┊40┊              },
+┊  ┊41┊        }
+┊  ┊42┊    }
 ┊23┊43┊}🚫↵
```

##### Changed client/imports/components/list-show.ng2.html
```diff
@@ -50,7 +50,7 @@
 ┊50┊50┊
 ┊51┊51┊    <div class="content-scrollable list-items">
 ┊52┊52┊        <div *ngIf="todosReady">
-┊53┊  ┊            <div *ngFor="let todo of todos">
+┊  ┊53┊            <div *ngFor="let todo of todos | async">
 ┊54┊54┊                <blaze-template name="Todos_item" [context]="getContextForItem(todo)"></blaze-template>
 ┊55┊55┊            </div>
 ┊56┊56┊            <div class="wrapper-message" *ngIf="!todos || todos.length == 0">
```
[}]: # 

> At the moment, we will use the exiting `Todo_item` template to show the items - we will later migrate it too - so we just pass the required params using `getContextForItem`.

And now let's implement and migrate the code into the Component's class, and let's add the events in the view

[{]: <helper> (diff_step 12.3)
#### Step 12.3: Implemented the events in the UI

##### Changed client/imports/components/list-show.component.ts
```diff
@@ -1,43 +1,112 @@
 ┊  1┊  1┊import {Component, OnInit} from "@angular/core";
-┊  2┊   ┊import {ActivatedRoute, Params} from "@angular/router";
+┊   ┊  2┊import {ActivatedRoute, Params, Router} from "@angular/router";
 ┊  3┊  3┊import {MeteorObservable} from "meteor-rxjs";
 ┊  4┊  4┊import {Lists} from "../../../imports/api/lists/lists";
+┊   ┊  5┊import {
+┊   ┊  6┊  updateName,
+┊   ┊  7┊  makePublic,
+┊   ┊  8┊  makePrivate,
+┊   ┊  9┊  remove,
+┊   ┊ 10┊  insert,
+┊   ┊ 11┊} from '../../../imports/api/todos/methods';
+┊   ┊ 12┊import { displayError } from '../../../imports/ui/lib/errors';
+┊   ┊ 13┊import {Observable} from "rxjs";
 ┊  5┊ 14┊
 ┊  6┊ 15┊@Component({
-┊  7┊   ┊    template: '<blaze-template *ngIf="templateContext" name="Lists_show_page" [context]="templateContext"></blaze-template>'
+┊   ┊ 16┊    templateUrl: '/client/imports/components/list-show.html'
 ┊  8┊ 17┊})
 ┊  9┊ 18┊export class ListShowComponent implements OnInit {
 ┊ 10┊ 19┊    private list : any;
 ┊ 11┊ 20┊    private todosReady : boolean = false;
-┊ 12┊   ┊    private todos : Array<any>;
+┊   ┊ 21┊    private todos : Observable<any>;
 ┊ 13┊ 22┊    private editing : boolean = false;
+┊   ┊ 23┊    private editModel : any;
+┊   ┊ 24┊    private newItemModel : string = '';
 ┊ 14┊ 25┊
-┊ 15┊   ┊    constructor(private currentRoute: ActivatedRoute) {
-┊ 16┊   ┊
+┊   ┊ 26┊    constructor(private currentRoute: ActivatedRoute, private router: Router) {
+┊   ┊ 27┊        this.editModel = {
+┊   ┊ 28┊            name: ''
+┊   ┊ 29┊        }
 ┊ 17┊ 30┊    }
 ┊ 18┊ 31┊
 ┊ 19┊ 32┊    ngOnInit() {
 ┊ 20┊ 33┊        this.currentRoute.params.subscribe((params: Params) => {
 ┊ 21┊ 34┊            const listId = params['_id'];
-┊ 22┊   ┊            MeteorObservable.subscribe('todos.inList', listId).subscribe();
+┊   ┊ 35┊            MeteorObservable.subscribe('todos.inList', listId).zone().subscribe();
 ┊ 23┊ 36┊
 ┊ 24┊ 37┊            MeteorObservable.autorun().zone().subscribe(() => {
 ┊ 25┊ 38┊                if (listId && Lists.findOne(listId)) {
 ┊ 26┊ 39┊                    this.list = Lists.findOne(listId);
 ┊ 27┊ 40┊                    this.todosReady = true;
-┊ 28┊   ┊                    this.todos = this.list.todos();
+┊   ┊ 41┊                    this.todos = this.list.todos().zone();
 ┊ 29┊ 42┊                }
 ┊ 30┊ 43┊            })
 ┊ 31┊ 44┊        });
 ┊ 32┊ 45┊    }
 ┊ 33┊ 46┊
+┊   ┊ 47┊    deleteList() {
+┊   ┊ 48┊        const list = this.list;
+┊   ┊ 49┊        const message = `Are you sure you want to delete the list?`;
+┊   ┊ 50┊
+┊   ┊ 51┊        if (confirm(message)) {
+┊   ┊ 52┊            remove.call({
+┊   ┊ 53┊                listId: list._id,
+┊   ┊ 54┊            }, displayError);
+┊   ┊ 55┊
+┊   ┊ 56┊            this.router.navigate(['Home']);
+┊   ┊ 57┊
+┊   ┊ 58┊            return true;
+┊   ┊ 59┊        }
+┊   ┊ 60┊
+┊   ┊ 61┊        return false;
+┊   ┊ 62┊    }
+┊   ┊ 63┊
+┊   ┊ 64┊    editList(toggle) {
+┊   ┊ 65┊        this.editModel.name = this.list.name;
+┊   ┊ 66┊        this.editing = toggle;
+┊   ┊ 67┊    }
+┊   ┊ 68┊
+┊   ┊ 69┊    toggleListPrivacy() {
+┊   ┊ 70┊        const list = this.list;
+┊   ┊ 71┊
+┊   ┊ 72┊        if (list.userId) {
+┊   ┊ 73┊            makePublic.call({ listId: list._id }, displayError);
+┊   ┊ 74┊        } else {
+┊   ┊ 75┊            makePrivate.call({ listId: list._id }, displayError);
+┊   ┊ 76┊        }
+┊   ┊ 77┊    }
+┊   ┊ 78┊
+┊   ┊ 79┊    addNew() {
+┊   ┊ 80┊        if (this.newItemModel == '') {
+┊   ┊ 81┊            return;
+┊   ┊ 82┊        }
+┊   ┊ 83┊
+┊   ┊ 84┊        insert.call({
+┊   ┊ 85┊            listId: this.list._id,
+┊   ┊ 86┊            text: this.newItemModel,
+┊   ┊ 87┊        }, displayError);
+┊   ┊ 88┊
+┊   ┊ 89┊        this.newItemModel = '';
+┊   ┊ 90┊    }
+┊   ┊ 91┊
+┊   ┊ 92┊    saveList() {
+┊   ┊ 93┊        if (this.editing) {
+┊   ┊ 94┊            updateName.call({
+┊   ┊ 95┊                listId: this.list._id,
+┊   ┊ 96┊                newName: this.editModel.name,
+┊   ┊ 97┊            }, displayError);
+┊   ┊ 98┊
+┊   ┊ 99┊            this.editing = false;
+┊   ┊100┊        }
+┊   ┊101┊    }
+┊   ┊102┊
 ┊ 34┊103┊    getContextForItem(todo) {
 ┊ 35┊104┊        return {
-┊ 36┊   ┊              todo: todo,
-┊ 37┊   ┊              editing: false,
-┊ 38┊   ┊              onEditingChange(editing) {
+┊   ┊105┊            todo: todo,
+┊   ┊106┊            editing: false,
+┊   ┊107┊            onEditingChange(editing) {
 ┊ 39┊108┊
-┊ 40┊   ┊              },
+┊   ┊109┊            },
 ┊ 41┊110┊        }
 ┊ 42┊111┊    }
 ┊ 43┊112┊}🚫↵
```

##### Changed client/imports/components/list-show.ng2.html
```diff
@@ -1,9 +1,9 @@
 ┊1┊1┊<div class="page lists-show">
 ┊2┊2┊    <nav class="js-title-nav" *ngIf="list">
-┊3┊ ┊        <form *ngIf="editing" class="js-edit-form list-edit-form">
-┊4┊ ┊            <input type="text" name="name" [value]="editModel.name">
+┊ ┊3┊        <form *ngIf="editing" class="js-edit-form list-edit-form" (ngSubmit)="saveList()" #editForm="ngForm">
+┊ ┊4┊            <input type="text" [(ngModel)]="editModel.name" (blur)="saveList()" name="editNameInput">
 ┊5┊5┊            <div class="nav-group right">
-┊6┊ ┊                <a href="#" class="js-cancel nav-item">
+┊ ┊6┊                <a href="#" class="js-cancel nav-item" (click)="editList(false)">
 ┊7┊7┊                    <span class="icon-close js-cancel" title="Cancel"></span>
 ┊8┊8┊                </a>
 ┊9┊9┊            </div>
```
```diff
@@ -15,7 +15,7 @@
 ┊15┊15┊                </a>
 ┊16┊16┊            </div>
 ┊17┊17┊
-┊18┊  ┊            <h1 class="js-edit-list title-page">
+┊  ┊18┊            <h1 class="js-edit-list title-page" (click)="editList(true)">
 ┊19┊19┊                <span class="title-wrapper">{{list.name}}</span>
 ┊20┊20┊                <span class="count-list">{{list.incompleteCount}}</span>
 ┊21┊21┊            </h1>
```
```diff
@@ -31,19 +31,19 @@
 ┊31┊31┊                    <span class="icon-cog"></span>
 ┊32┊32┊                </div>
 ┊33┊33┊                <div class="options-web">
-┊34┊  ┊                    <a class="js-toggle-list-privacy nav-item">
+┊  ┊34┊                    <a class="js-toggle-list-privacy nav-item" (click)="toggleListPrivacy()">
 ┊35┊35┊                        <span *ngIf="list.userId" class="icon-lock" title="Make list public"></span>
 ┊36┊36┊                        <span *ngIf="!list.userId" class="icon-unlock" title="Make list private"></span>
 ┊37┊37┊                    </a>
-┊38┊  ┊                    <a class="js-delete-list nav-item">
+┊  ┊38┊                    <a class="js-delete-list nav-item" (click)="deleteList()">
 ┊39┊39┊                        <span class="icon-trash" title="Delete list"></span>
 ┊40┊40┊                    </a>
 ┊41┊41┊                </div>
 ┊42┊42┊            </div>
 ┊43┊43┊        </div>
 ┊44┊44┊
-┊45┊  ┊        <form class="js-todo-new todo-new input-symbol">
-┊46┊  ┊            <input type="text" placeholder="Type to add new tasks">
+┊  ┊45┊        <form class="js-todo-new todo-new input-symbol" (ngSubmit)="addNew()" #newForm="ngForm">
+┊  ┊46┊            <input type="text" placeholder="Type to add new tasks" [(ngModel)]="newItemModel" name="newItemInput">
 ┊47┊47┊            <span class="icon-add js-todo-add"></span>
 ┊48┊48┊        </form>
 ┊49┊49┊    </nav>
```
[}]: # 

And remember we wrapped the Collection? we need to do the same for Todo Collection:

[{]: <helper> (diff_step 12.4)
#### Step 12.4: Changes in the Todos collection

##### Changed imports/api/todos/todos.js
```diff
@@ -1,6 +1,7 @@
 ┊1┊1┊import { Mongo } from 'meteor/mongo';
 ┊2┊2┊import { Factory } from 'meteor/factory';
 ┊3┊3┊import faker from 'faker';
+┊ ┊4┊import {MongoObservable} from "meteor-rxjs";
 ┊4┊5┊
 ┊5┊6┊import incompleteCountDenormalizer from './incompleteCountDenormalizer.js';
 ┊6┊7┊import { SimpleSchema } from 'meteor/aldeed:simple-schema';
```
```diff
@@ -27,16 +28,16 @@
 ┊27┊28┊  }
 ┊28┊29┊}
 ┊29┊30┊
-┊30┊  ┊export const Todos = new TodosCollection('Todos');
+┊  ┊31┊export const Todos = new MongoObservable.fromExisting(new TodosCollection('Todos'));
 ┊31┊32┊
 ┊32┊33┊// Deny all client-side updates since we will be using methods to manage this collection
-┊33┊  ┊Todos.deny({
+┊  ┊34┊Todos.collection.deny({
 ┊34┊35┊  insert() { return true; },
 ┊35┊36┊  update() { return true; },
 ┊36┊37┊  remove() { return true; },
 ┊37┊38┊});
 ┊38┊39┊
-┊39┊  ┊Todos.schema = new SimpleSchema({
+┊  ┊40┊let schema = new SimpleSchema({
 ┊40┊41┊  listId: {
 ┊41┊42┊    type: String,
 ┊42┊43┊    regEx: SimpleSchema.RegEx.Id,
```
```diff
@@ -56,12 +57,12 @@
 ┊56┊57┊  },
 ┊57┊58┊});
 ┊58┊59┊
-┊59┊  ┊Todos.attachSchema(Todos.schema);
+┊  ┊60┊Todos.collection.attachSchema(schema);
 ┊60┊61┊
 ┊61┊62┊// This represents the keys from Lists objects that should be published
 ┊62┊63┊// to the client. If we add secret properties to List objects, don't list
 ┊63┊64┊// them here to keep them private to the server.
-┊64┊  ┊Todos.publicFields = {
+┊  ┊65┊Todos.collection.publicFields = {
 ┊65┊66┊  listId: 1,
 ┊66┊67┊  text: 1,
 ┊67┊68┊  createdAt: 1,
```
```diff
@@ -77,7 +78,7 @@
 ┊77┊78┊  createdAt: () => new Date(),
 ┊78┊79┊});
 ┊79┊80┊
-┊80┊  ┊Todos.helpers({
+┊  ┊81┊Todos.collection.helpers({
 ┊81┊82┊  list() {
 ┊82┊83┊    return Lists.findOne(this.listId);
 ┊83┊84┊  },
```
[}]: # 

That's it! we can now remove the old files of this Template (`imports/ui/components/lists-show.html`, `imports/ui/components/lists-show.js`, `imports/ui/pages/lists-show-page.js`, `imports/ui/pages/lists-show-page.html`), and we can removed the imports for those files from the routes file (`imports/startup/client/routes.js`).

[}]: #
[{]: <region> (footer)
[{]: <helper> (nav_step)
| [< Previous Step](step11.md) | [Next Step >](step13.md) |
|:--------------------------------|--------------------------------:|
[}]: #
[}]: #