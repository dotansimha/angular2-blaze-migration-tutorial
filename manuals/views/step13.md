[{]: <region> (header)
# Step 13: Migrate the List Item
[}]: #
[{]: <region> (body)
Our last relevant Blaze Template is the list item - this is a little bit tricky because this template need to interact with the parent Component and get the actual Todo item, and also expose events for the parent Component - so we will use a new Angular 2 features called `Input` and `Output` for that.

So let's start with the Component migration this time:

[{]: <helper> (diff_step 13.1)
#### Step 13.1: Added the list item component

##### Added client/imports/components/list-item.component.ts
```diff
@@ -0,0 +1,53 @@
+┊  ┊ 1┊import {Component, Input, Output, EventEmitter} from '@angular/core';
+┊  ┊ 2┊import {
+┊  ┊ 3┊  setCheckedStatus,
+┊  ┊ 4┊  updateText,
+┊  ┊ 5┊  remove,
+┊  ┊ 6┊} from '../../../imports/api/todos/methods';
+┊  ┊ 7┊import {displayError} from '../../../imports/ui/lib/errors';
+┊  ┊ 8┊
+┊  ┊ 9┊declare let _;
+┊  ┊10┊
+┊  ┊11┊@Component({
+┊  ┊12┊  selector: 'list-item',
+┊  ┊13┊  templateUrl: '/client/imports/components/list-item.html'
+┊  ┊14┊})
+┊  ┊15┊export class ListItemComponent {
+┊  ┊16┊  @Input("todo") todo: any;
+┊  ┊17┊  @Input("editing") editing: boolean;
+┊  ┊18┊  @Output("editChange") editChange = new EventEmitter();
+┊  ┊19┊
+┊  ┊20┊  constructor() {
+┊  ┊21┊  }
+┊  ┊22┊
+┊  ┊23┊  toggleEdit(isEdit) {
+┊  ┊24┊    if (!isEdit || (isEdit && this.editing)) {
+┊  ┊25┊      this.editChange.emit({
+┊  ┊26┊        editing: isEdit,
+┊  ┊27┊        todoId: this.todo._id
+┊  ┊28┊      });
+┊  ┊29┊    }
+┊  ┊30┊  }
+┊  ┊31┊
+┊  ┊32┊  remove() {
+┊  ┊33┊    remove.call({
+┊  ┊34┊      todoId: this.todo._id,
+┊  ┊35┊    }, displayError);
+┊  ┊36┊  }
+┊  ┊37┊
+┊  ┊38┊  checkedChange(event) {
+┊  ┊39┊    setCheckedStatus.call({
+┊  ┊40┊      todoId: this.todo._id,
+┊  ┊41┊      newCheckedStatus: event.target.checked,
+┊  ┊42┊    });
+┊  ┊43┊  }
+┊  ┊44┊
+┊  ┊45┊  updateText(event) {
+┊  ┊46┊    _.throttle((event) => {
+┊  ┊47┊      updateText.call({
+┊  ┊48┊        todoId: this.todo._id,
+┊  ┊49┊        newText: event.target.value,
+┊  ┊50┊      }, displayError);
+┊  ┊51┊    }, 300)(event);
+┊  ┊52┊  }
+┊  ┊53┊}🚫↵
```
[}]: # 

We copied the code from the old Blaze Template, and added two `Input`s and one `Output` in the Component declaration:

- `todo` which is the actual todo item.
- `editing` which is an indication for the current item that being edited.
- `editChange` which is an event we expose to the parent Component that triggered when starting to edit an item in the list.

And add the new Component to the NgModule:

[{]: <helper> (diff_step 13.2)
#### Step 13.2: Added the new component to the module

##### Changed client/imports/app.module.ts
```diff
@@ -8,6 +8,7 @@
 ┊ 8┊ 8┊import {JoinComponent} from "./components/join.component";
 ┊ 9┊ 9┊import {SigninComponent} from "./components/signin.component";
 ┊10┊10┊import {FormsModule} from "@angular/forms";
+┊  ┊11┊import {ListItemComponent} from "./components/list-item.component";
 ┊11┊12┊
 ┊12┊13┊@NgModule({
 ┊13┊14┊    // Components, Pipes, Directive
```
```diff
@@ -16,7 +17,8 @@
 ┊16┊17┊        ListShowComponent,
 ┊17┊18┊        ListRedirectorComponent,
 ┊18┊19┊        JoinComponent,
-┊19┊  ┊        SigninComponent
+┊  ┊20┊        SigninComponent,
+┊  ┊21┊        ListItemComponent
 ┊20┊22┊    ],
 ┊21┊23┊    // Entry Components
 ┊22┊24┊    entryComponents: [
```
[}]: # 

Now let's migrate the HTML Template of this Component:

[{]: <helper> (diff_step 13.3)
#### Step 13.3: Added the list item view

##### Added client/imports/components/list-item.ng2.html
```diff
@@ -0,0 +1,11 @@
+┊  ┊ 1┊<div class="list-item" [ngClass]="{'editing': editing, 'checked': todo.checked}">
+┊  ┊ 2┊    <label class="checkbox">
+┊  ┊ 3┊        <input type="checkbox" [checked]="todo.checked" (change)="checkedChange($event)" name="checked">
+┊  ┊ 4┊        <span class="checkbox-custom"></span>
+┊  ┊ 5┊    </label>
+┊  ┊ 6┊
+┊  ┊ 7┊    <input type="text" [value]="todo.text" (blur)="toggleEdit(false)" (focus)="toggleEdit(true)" (keyup)="updateText($event)" placeholder="Task name">
+┊  ┊ 8┊    <a class="js-delete-item delete-item" (click)="remove()">
+┊  ┊ 9┊        <span class="icon-trash"></span>
+┊  ┊10┊    </a>
+┊  ┊11┊</div>🚫↵
```
[}]: # 

And now we need to use this new Component in the `ListShowComponent`:

[{]: <helper> (diff_step 13.4)
#### Step 13.4: Updated the usage in the list show component

##### Changed client/imports/components/list-show.ng2.html
```diff
@@ -51,7 +51,7 @@
 ┊51┊51┊    <div class="content-scrollable list-items">
 ┊52┊52┊        <div *ngIf="todosReady">
 ┊53┊53┊            <div *ngFor="let todo of todos | async">
-┊54┊  ┊                <blaze-template name="Todos_item" [context]="getContextForItem(todo)"></blaze-template>
+┊  ┊54┊                <list-item [todo]="todo" [editing]="editingTodo" (editChange)="onTodoItemEditChange($event)"></list-item>
 ┊55┊55┊            </div>
 ┊56┊56┊            <div class="wrapper-message" *ngIf="!todos || todos.length == 0">
 ┊57┊57┊                <div class="title-message">No tasks here</div>
```
[}]: # 

And let's implement the actual event handler and use declare the usage of the new Component:

[{]: <helper> (diff_step 13.5)
#### Step 13.5: Added events and usage of the new component

##### Changed client/imports/components/list-show.component.ts
```diff
@@ -22,6 +22,7 @@
 ┊22┊22┊    private editing : boolean = false;
 ┊23┊23┊    private editModel : any;
 ┊24┊24┊    private newItemModel : string = '';
+┊  ┊25┊    private editingTodo : number | boolean;
 ┊25┊26┊
 ┊26┊27┊    constructor(private currentRoute: ActivatedRoute, private router: Router) {
 ┊27┊28┊        this.editModel = {
```
```diff
@@ -100,13 +101,12 @@
 ┊100┊101┊        }
 ┊101┊102┊    }
 ┊102┊103┊
-┊103┊   ┊    getContextForItem(todo) {
-┊104┊   ┊        return {
-┊105┊   ┊            todo: todo,
-┊106┊   ┊            editing: false,
-┊107┊   ┊            onEditingChange(editing) {
-┊108┊   ┊
-┊109┊   ┊            },
+┊   ┊104┊    onTodoItemEditChange(event) {
+┊   ┊105┊        if (event.editing) {
+┊   ┊106┊            this.editingTodo = event.todoId;
+┊   ┊107┊        }
+┊   ┊108┊        else {
+┊   ┊109┊            this.editingTodo = false;
 ┊110┊110┊        }
 ┊111┊111┊    }
 ┊112┊112┊}🚫↵
```
[}]: # 

And we are done! You can now remove all the files that related to the list item and removed it's import! (we did it in commit #9.6)

[}]: #
[{]: <region> (footer)
[{]: <helper> (nav_step)
| [< Previous Step](step12.md) | [Next Step >](step14.md) |
|:--------------------------------|--------------------------------:|
[}]: #
[}]: #