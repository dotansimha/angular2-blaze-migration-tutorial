[{]: <region> (header)
# Step 10: Migrate Template into Component
[}]: #
[{]: <region> (body)
So far we have Angular 2 application with Angular 2 Router, that wraps existing Blaze application and load it's Templates.

Our next step is about converting Blaze existing Template into Angular 2 Component.

In order to to so, we need to work top-down - because we can load Blaze existing Template from Angular 2 code.

So at the moment, the top most Blaze Template that loaded is the `App_Body` which contains the following:

- Full layout
- Dynamic load of child Blaze Templates
- List of To-do lists
- Other UI features such as login, sign-up and more

So let's start with the migration - our goal now is to migrate the `App_Body` so we can remove the Blaze files in the end of this step.

The replacement of this component as the main component will be our `MainComponent`.

Let's start with the HTML template - we will create a new file named `client/imports/components/main-component.ng2.html` and copy the contents of the `App_Body` template from the file (`imports/ui/layouts/app-body.html`).

Now let's start to make some modifications to make that file a valid Angular 2 template - we need to remove all the Blaze UI bindings, if, each and such.

We will replace them as follow:

- Blaze if/else - will become `ngIf`.
- Blaze each - will become `ngFor`.
- Blaze classes bindings will become `ngClass`.
- Dynamic load of Blaze Template will become `router-outlet`.

> We will also remove all the router dynamic links, and put a placeholder for them at the moment - we will take care of them later.

[{]: <helper> (diff_step 10.1)
#### Step 10.1: Migrate the App_body template

##### Added client/imports/main-component.ng2.html
```diff
@@ -0,0 +1,47 @@
+┊  ┊ 1┊<div id="container" [ngClass]="{'menu-open': menuOpen, 'cordova': isCordova}">
+┊  ┊ 2┊    <section id="menu">
+┊  ┊ 3┊        <div *ngIf="currentUser" class="btns-group-vertical">
+┊  ┊ 4┊            <a href="#" class="js-user-menu btn-secondary">
+┊  ┊ 5┊                <span *ngIf="userMenuOpen" class="icon-arrow-up"></span>
+┊  ┊ 6┊                <span *ngIf="!userMenuOpen" class="icon-arrow-down"></span>
+┊  ┊ 7┊
+┊  ┊ 8┊                {{ userEmail }}
+┊  ┊ 9┊            </a>
+┊  ┊10┊            <a *ngIf="userMenuOpen" class="js-logout btn-secondary">Logout</a>
+┊  ┊11┊        </div>
+┊  ┊12┊        <div *ngIf="!currentUser" class="btns-group">
+┊  ┊13┊            <a href="SIGNIN_LINK" class="btn-secondary">Sign In</a>
+┊  ┊14┊            <a href="JOIN_LINK" class="btn-secondary">Join</a>
+┊  ┊15┊        </div>
+┊  ┊16┊
+┊  ┊17┊        <div class="list-todos">
+┊  ┊18┊            <a class="js-new-list link-list-new">
+┊  ┊19┊                <span class="icon-plus"></span>
+┊  ┊20┊                New List
+┊  ┊21┊            </a>
+┊  ┊22┊
+┊  ┊23┊            <a *ngFor="let list of lists | async" href="LIST_LINK" [title]="list.name" class="list-todo">
+┊  ┊24┊                <span *ngIf="list.userId" class="icon-lock"></span>
+┊  ┊25┊                <span *ngIf="list.incompleteCount" class="count-list">{{list.incompleteCount}}</span>
+┊  ┊26┊
+┊  ┊27┊                {{list.name}}
+┊  ┊28┊            </a>
+┊  ┊29┊        </div>
+┊  ┊30┊    </section>
+┊  ┊31┊
+┊  ┊32┊    <div *ngIf="!isConnected()" class="notifications">
+┊  ┊33┊        <div class="notification">
+┊  ┊34┊            <span class="icon-sync"></span>
+┊  ┊35┊            <div class="meta">
+┊  ┊36┊                <div class="title-notification">Trying to connect</div>
+┊  ┊37┊                <div class="description">There seems to be a connection issue</div>
+┊  ┊38┊            </div>
+┊  ┊39┊        </div>
+┊  ┊40┊    </div>
+┊  ┊41┊
+┊  ┊42┊    <div class="content-overlay"></div>
+┊  ┊43┊
+┊  ┊44┊    <div id="content-container">
+┊  ┊45┊        <router-outlet></router-outlet>
+┊  ┊46┊    </div>
+┊  ┊47┊</div>🚫↵
```
[}]: # 

> Note that unlike Blaze, in Angular 2 we define events such click in the HTML - we will handle that later.

So now we have the HTML template - we need to add some code to the Angular 2 Component:

- We need to use the new template.
- We need to add stubs for the methods we use in the template (`isConnected`, getter for `userEmail`)

So let's do it:

[{]: <helper> (diff_step 10.2)
#### Step 10.2: Use the new template and added stub methods

##### Changed client/imports/main.component.ts
```diff
@@ -1,18 +1,31 @@
 ┊ 1┊ 1┊import '/imports/startup/client';
 ┊ 2┊ 2┊import {Component, OnInit} from "@angular/core";
 ┊ 3┊ 3┊import {MeteorObservable} from "meteor-rxjs";
+┊  ┊ 4┊import {Meteor} from "meteor/meteor";
 ┊ 4┊ 5┊
 ┊ 5┊ 6┊@Component({
 ┊ 6┊ 7┊  selector: 'app',
-┊ 7┊  ┊  template: '<router-outlet></router-outlet>'
+┊  ┊ 8┊  templateUrl: '/client/imports/main-component.html'
 ┊ 8┊ 9┊})
 ┊ 9┊10┊export class MainComponent implements OnInit {
-┊10┊  ┊  constructor() {
+┊  ┊11┊  private isCordova : boolean;
+┊  ┊12┊  private menuOpen : boolean = false;
+┊  ┊13┊  private userMenuOpen : boolean = false;
 ┊11┊14┊
+┊  ┊15┊  constructor() {
+┊  ┊16┊    this.isCordova = Meteor.isCordova;
 ┊12┊17┊  }
 ┊13┊18┊
 ┊14┊19┊  ngOnInit() {
 ┊15┊20┊    MeteorObservable.subscribe("lists.public").subscribe();
 ┊16┊21┊    MeteorObservable.subscribe("lists.private").subscribe();
 ┊17┊22┊  }
+┊  ┊23┊
+┊  ┊24┊  isConnected() {
+┊  ┊25┊    return true;
+┊  ┊26┊  }
+┊  ┊27┊
+┊  ┊28┊  get userEmail() {
+┊  ┊29┊    return "";
+┊  ┊30┊  }
 ┊18┊31┊}🚫↵
```
[}]: # 

> We also commented the code that in charge of redirection to a list page, we will handle that later.

Now, because we are implementing a replacement for App_body, we need to load the inner Template instead of the App_Body, so let's change it:

[{]: <helper> (diff_step 10.3)
#### Step 10.3: Change the blaze template type that loaded

##### Changed client/imports/components/list-show.component.ts
```diff
@@ -2,7 +2,7 @@
 ┊2┊2┊import {ActivatedRoute, Params} from "@angular/router";
 ┊3┊3┊
 ┊4┊4┊@Component({
-┊5┊ ┊    template: '<blaze-template *ngIf="templateContext" name="App_body" [context]="templateContext"></blaze-template>'
+┊ ┊5┊    template: '<blaze-template *ngIf="templateContext" name="Lists_show_page" [context]="templateContext"></blaze-template>'
 ┊6┊6┊})
 ┊7┊7┊export class ListShowComponent implements OnInit {
 ┊8┊8┊    private templateContext: any;
```
```diff
@@ -16,7 +16,6 @@
 ┊16┊16┊            const listId = params['_id'];
 ┊17┊17┊
 ┊18┊18┊            this.templateContext = {
-┊19┊  ┊                main: "Lists_show_page",
 ┊20┊19┊                _id: listId
 ┊21┊20┊            };
 ┊22┊21┊        });
```
[}]: # 

Now, we need to provide the `lists` object to the view - this will be that lists of Todo lists.

We will use MeteorObservable again, and create the `lists` as an Observable of the data in the Cursor (we will change the implementation of the Collection soon to support RxJS).

> Because our MongoDB selector is depend on the use connection, and we want to update it when the user log in/out, we need to wrap our query with `Tracker.autorun`.

[{]: <helper> (diff_step 10.4)
#### Step 10.4: Added the list using MeteorObservable

##### Changed client/imports/main.component.ts
```diff
@@ -1,7 +1,9 @@
 ┊1┊1┊import '/imports/startup/client';
 ┊2┊2┊import {Component, OnInit} from "@angular/core";
-┊3┊ ┊import {MeteorObservable} from "meteor-rxjs";
 ┊4┊3┊import {Meteor} from "meteor/meteor";
+┊ ┊4┊import {MeteorObservable} from "meteor-rxjs";
+┊ ┊5┊import {Observable} from "rxjs";
+┊ ┊6┊import {Lists} from "../../imports/api/lists/lists";
 ┊5┊7┊
 ┊6┊8┊@Component({
 ┊7┊9┊  selector: 'app',
```
```diff
@@ -11,6 +13,7 @@
 ┊11┊13┊  private isCordova : boolean;
 ┊12┊14┊  private menuOpen : boolean = false;
 ┊13┊15┊  private userMenuOpen : boolean = false;
+┊  ┊16┊  private lists: Observable<any>;
 ┊14┊17┊
 ┊15┊18┊  constructor() {
 ┊16┊19┊    this.isCordova = Meteor.isCordova;
```
```diff
@@ -19,6 +22,15 @@
 ┊19┊22┊  ngOnInit() {
 ┊20┊23┊    MeteorObservable.subscribe("lists.public").subscribe();
 ┊21┊24┊    MeteorObservable.subscribe("lists.private").subscribe();
+┊  ┊25┊
+┊  ┊26┊    MeteorObservable.autorun().zone().subscribe(() => {
+┊  ┊27┊      this.lists = Lists.find({
+┊  ┊28┊        $or: [
+┊  ┊29┊          {userId: {$exists: false}},
+┊  ┊30┊          {userId: Meteor.userId()},
+┊  ┊31┊        ]
+┊  ┊32┊      }).zone();
+┊  ┊33┊    });
 ┊22┊34┊  }
 ┊23┊35┊
 ┊24┊36┊  isConnected() {
```
[}]: # 

> We used the `zone()` method in order to bind the async data fetch to the Angular 2 Zone of the current Component - so when the data changes - the Zone will trigger an update - and the view will update.

Now we need to change the `Mongo.Collection` creation in order to have a Collection with RxJS API - there are multiple ways of doing it - in this case, we just wrap the existing Collection:

[{]: <helper> (diff_step 10.5)
#### Step 10.5: Changes in the lists collection definition to expose RxJS API

##### Changed imports/api/lists/lists.js
```diff
@@ -1,7 +1,6 @@
-┊1┊ ┊import { Mongo } from 'meteor/mongo';
 ┊2┊1┊import { SimpleSchema } from 'meteor/aldeed:simple-schema';
-┊3┊ ┊import { Factory } from 'meteor/factory';
 ┊4┊2┊import { Todos } from '../todos/todos.js';
+┊ ┊3┊import {MongoObservable} from "meteor-rxjs";
 ┊5┊4┊
 ┊6┊5┊class ListsCollection extends Mongo.Collection {
 ┊7┊6┊  insert(list, callback) {
```
```diff
@@ -25,35 +24,33 @@
 ┊25┊24┊  }
 ┊26┊25┊}
 ┊27┊26┊
-┊28┊  ┊export const Lists = new ListsCollection('Lists');
+┊  ┊27┊export const Lists = new MongoObservable.fromExisting(new ListsCollection("Lists"));
 ┊29┊28┊
 ┊30┊29┊// Deny all client-side updates since we will be using methods to manage this collection
-┊31┊  ┊Lists.deny({
+┊  ┊30┊Lists.collection.deny({
 ┊32┊31┊  insert() { return true; },
 ┊33┊32┊  update() { return true; },
 ┊34┊33┊  remove() { return true; },
 ┊35┊34┊});
 ┊36┊35┊
-┊37┊  ┊Lists.schema = new SimpleSchema({
+┊  ┊36┊let schema = new SimpleSchema({
 ┊38┊37┊  name: { type: String },
 ┊39┊38┊  incompleteCount: { type: Number, defaultValue: 0 },
 ┊40┊39┊  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
 ┊41┊40┊});
 ┊42┊41┊
-┊43┊  ┊Lists.attachSchema(Lists.schema);
+┊  ┊42┊Lists.collection.attachSchema(schema);
 ┊44┊43┊
 ┊45┊44┊// This represents the keys from Lists objects that should be published
 ┊46┊45┊// to the client. If we add secret properties to List objects, don't list
 ┊47┊46┊// them here to keep them private to the server.
-┊48┊  ┊Lists.publicFields = {
+┊  ┊47┊Lists.collection.publicFields = {
 ┊49┊48┊  name: 1,
 ┊50┊49┊  incompleteCount: 1,
 ┊51┊50┊  userId: 1,
 ┊52┊51┊};
 ┊53┊52┊
-┊54┊  ┊Factory.define('list', Lists, {});
-┊55┊  ┊
-┊56┊  ┊Lists.helpers({
+┊  ┊53┊Lists.collection.helpers({
 ┊57┊54┊  // A list is considered to be private if it has a userId set
 ┊58┊55┊  isPrivate() {
 ┊59┊56┊    return !!this.userId;
```
```diff
@@ -73,3 +70,4 @@
 ┊73┊70┊    return Todos.find({ listId: this._id }, { sort: { createdAt: -1 } });
 ┊74┊71┊  },
 ┊75┊72┊});
+┊  ┊73┊
```
[}]: # 

> You can use the `collection` property of the instance in order to get the actual `Mongo.Collection` that wrapped.

Now let's implement the stub methods we created earlier, starting with `isConnected`:

[{]: <helper> (diff_step 10.6)
#### Step 10.6: Implemented isConnected

##### Changed client/imports/main.component.ts
```diff
@@ -34,7 +34,7 @@
 ┊34┊34┊  }
 ┊35┊35┊
 ┊36┊36┊  isConnected() {
-┊37┊  ┊    return true;
+┊  ┊37┊    return Meteor.status().connected;
 ┊38┊38┊  }
 ┊39┊39┊
 ┊40┊40┊  get userEmail() {
```
[}]: # 

And the getter `userEmail`:

[{]: <helper> (diff_step 10.7)
#### Step 10.7: Implemented emailLocalPart

##### Changed client/imports/main.component.ts
```diff
@@ -38,6 +38,13 @@
 ┊38┊38┊  }
 ┊39┊39┊
 ┊40┊40┊  get userEmail() {
-┊41┊  ┊    return "";
+┊  ┊41┊    if (Meteor.user()) {
+┊  ┊42┊      const email = Meteor.user().emails[0].address;
+┊  ┊43┊
+┊  ┊44┊      return email.substring(0, email.indexOf('@'));
+┊  ┊45┊    }
+┊  ┊46┊    else {
+┊  ┊47┊      return "";
+┊  ┊48┊    }
 ┊42┊49┊  }
 ┊43┊50┊}🚫↵
```
[}]: # 

Now let's keep implementing the missing logic in our `MainComponent` - starting with the router links and the active route indication:

[{]: <helper> (diff_step 10.8)
#### Step 10.8: Added router links and the active lists indication

##### Changed client/imports/main-component.ng2.html
```diff
@@ -10,8 +10,8 @@
 ┊10┊10┊            <a *ngIf="userMenuOpen" class="js-logout btn-secondary">Logout</a>
 ┊11┊11┊        </div>
 ┊12┊12┊        <div *ngIf="!currentUser" class="btns-group">
-┊13┊  ┊            <a href="SIGNIN_LINK" class="btn-secondary">Sign In</a>
-┊14┊  ┊            <a href="JOIN_LINK" class="btn-secondary">Join</a>
+┊  ┊13┊            <a routerLink="/signin" class="btn-secondary">Sign In</a>
+┊  ┊14┊            <a routerLink="/join" class="btn-secondary">Join</a>
 ┊15┊15┊        </div>
 ┊16┊16┊
 ┊17┊17┊        <div class="list-todos">
```
```diff
@@ -20,7 +20,7 @@
 ┊20┊20┊                New List
 ┊21┊21┊            </a>
 ┊22┊22┊
-┊23┊  ┊            <a *ngFor="let list of lists | async" href="LIST_LINK" [title]="list.name" class="list-todo">
+┊  ┊23┊            <a *ngFor="let list of lists | async" [routerLink]="['lists', list._id]" routerLinkActive="active" [title]="list.name" class="list-todo">
 ┊24┊24┊                <span *ngIf="list.userId" class="icon-lock"></span>
 ┊25┊25┊                <span *ngIf="list.incompleteCount" class="count-list">{{list.incompleteCount}}</span>
```
[}]: # 

We used a new Routes that not yet implemented - signin and join - so let's create stubs for them:

[{]: <helper> (diff_step 10.9)
#### Step 10.9: Added stubs for signin/join components

##### Added client/imports/components/join.component.ts
```diff
@@ -0,0 +1,7 @@
+┊ ┊1┊import {Component} from "@angular/core";
+┊ ┊2┊
+┊ ┊3┊@Component({
+┊ ┊4┊  template: 'Join!'
+┊ ┊5┊})
+┊ ┊6┊export class JoinComponent {
+┊ ┊7┊}🚫↵
```

##### Added client/imports/components/signin.component.ts
```diff
@@ -0,0 +1,7 @@
+┊ ┊1┊import {Component} from "@angular/core";
+┊ ┊2┊
+┊ ┊3┊@Component({
+┊ ┊4┊  template: 'Signin!'
+┊ ┊5┊})
+┊ ┊6┊export class SigninComponent {
+┊ ┊7┊}🚫↵
```
[}]: # 

And let's add them to the NgModule declaration:

[{]: <helper> (diff_step 10.10)
#### Step 10.10: Added join/signin component to the module declaration

##### Changed client/imports/app.module.ts
```diff
@@ -5,13 +5,17 @@
 ┊ 5┊ 5┊import {ListShowComponent} from "./components/list-show.component";
 ┊ 6┊ 6┊import {ListRedirectorComponent} from "./components/list-redirector.component";
 ┊ 7┊ 7┊import {Angular2BlazeTemplateModule} from "angular2-blaze-template";
+┊  ┊ 8┊import {JoinComponent} from "./components/join.component";
+┊  ┊ 9┊import {SigninComponent} from "./components/signin.component";
 ┊ 8┊10┊
 ┊ 9┊11┊@NgModule({
 ┊10┊12┊    // Components, Pipes, Directive
 ┊11┊13┊    declarations: [
 ┊12┊14┊        MainComponent,
 ┊13┊15┊        ListShowComponent,
-┊14┊  ┊        ListRedirectorComponent
+┊  ┊16┊        ListRedirectorComponent,
+┊  ┊17┊        JoinComponent,
+┊  ┊18┊        SigninComponent
 ┊15┊19┊    ],
 ┊16┊20┊    // Entry Components
 ┊17┊21┊    entryComponents: [
```
[}]: # 

And let's add the routes to the Router definition:

[{]: <helper> (diff_step 10.11)
#### Step 10.11: Added join/signin component to the router

##### Changed client/imports/app.routes.ts
```diff
@@ -2,10 +2,14 @@
 ┊ 2┊ 2┊import {Routes, RouterModule} from '@angular/router';
 ┊ 3┊ 3┊import {ListShowComponent} from "./components/list-show.component";
 ┊ 4┊ 4┊import {ListRedirectorComponent} from "./components/list-redirector.component";
+┊  ┊ 5┊import {JoinComponent} from "./components/join.component";
+┊  ┊ 6┊import {SigninComponent} from "./components/signin.component";
 ┊ 5┊ 7┊
 ┊ 6┊ 8┊const appRoutes: Routes = [
 ┊ 7┊ 9┊    {path: '', component: ListRedirectorComponent},
-┊ 8┊  ┊    {path: 'lists/:_id', component: ListShowComponent}
+┊  ┊10┊    {path: 'lists/:_id', component: ListShowComponent},
+┊  ┊11┊    {path: 'join', component: JoinComponent},
+┊  ┊12┊    {path: 'signin', component: SigninComponent}
 ┊ 9┊13┊];
 ┊10┊14┊
 ┊11┊15┊export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
```
[}]: # 

Let's implement `addNewList` action in our Component, which uses the existing logic from the old Blaze code:

[{]: <helper> (diff_step 10.12)
#### Step 10.12: Added addNewList method

##### Changed client/imports/main.component.ts
```diff
@@ -4,6 +4,8 @@
 ┊ 4┊ 4┊import {MeteorObservable} from "meteor-rxjs";
 ┊ 5┊ 5┊import {Observable} from "rxjs";
 ┊ 6┊ 6┊import {Lists} from "../../imports/api/lists/lists";
+┊  ┊ 7┊import {insert} from "../../imports/api/lists/methods";
+┊  ┊ 8┊import {Router} from "@angular/router";
 ┊ 7┊ 9┊
 ┊ 8┊10┊@Component({
 ┊ 9┊11┊  selector: 'app',
```
```diff
@@ -15,7 +17,7 @@
 ┊15┊17┊  private userMenuOpen : boolean = false;
 ┊16┊18┊  private lists: Observable<any>;
 ┊17┊19┊
-┊18┊  ┊  constructor() {
+┊  ┊20┊  constructor(private router: Router) {
 ┊19┊21┊    this.isCordova = Meteor.isCordova;
 ┊20┊22┊  }
 ┊21┊23┊
```
```diff
@@ -47,4 +49,15 @@
 ┊47┊49┊      return "";
 ┊48┊50┊    }
 ┊49┊51┊  }
+┊  ┊52┊
+┊  ┊53┊  addNewList() {
+┊  ┊54┊    const listId = insert.call((err) => {
+┊  ┊55┊      if (err) {
+┊  ┊56┊        this.router.navigate(['/']);
+┊  ┊57┊        alert('Could not create list.');
+┊  ┊58┊      }
+┊  ┊59┊    });
+┊  ┊60┊
+┊  ┊61┊    this.router.navigate(['/lists', listId]);
+┊  ┊62┊  }
 ┊50┊63┊}🚫↵
```
[}]: # 

And let's bind the action in the view:

[{]: <helper> (diff_step 10.13)
#### Step 10.13: Added click action to add new list

##### Changed client/imports/main-component.ng2.html
```diff
@@ -15,7 +15,7 @@
 ┊15┊15┊        </div>
 ┊16┊16┊
 ┊17┊17┊        <div class="list-todos">
-┊18┊  ┊            <a class="js-new-list link-list-new">
+┊  ┊18┊            <a class="js-new-list link-list-new" (click)="addNewList()">
 ┊19┊19┊                <span class="icon-plus"></span>
 ┊20┊20┊                New List
 ┊21┊21┊            </a>
```
[}]: # 

We need to make some changes in the implementation of the `methods.js` file, because we wrapped the collection with RxJS collection, so let's change the usage to use the actual Mongo.Collection object:

[{]: <helper> (diff_step 10.14)
#### Step 10.14: Changes in the method implementation

##### Changed imports/api/lists/methods.js
```diff
@@ -14,7 +14,7 @@
 ┊14┊14┊  name: 'lists.insert',
 ┊15┊15┊  validate: new SimpleSchema({}).validator(),
 ┊16┊16┊  run() {
-┊17┊  ┊    return Lists.insert({});
+┊  ┊17┊    return Lists.collection.insert({});
 ┊18┊18┊  },
 ┊19┊19┊});
 ┊20┊20┊
```
```diff
@@ -27,14 +27,14 @@
 ┊27┊27┊        'Must be logged in to make private lists.');
 ┊28┊28┊    }
 ┊29┊29┊
-┊30┊  ┊    const list = Lists.findOne(listId);
+┊  ┊30┊    const list = Lists.collection.findOne(listId);
 ┊31┊31┊
 ┊32┊32┊    if (list.isLastPublicList()) {
 ┊33┊33┊      throw new Meteor.Error('lists.makePrivate.lastPublicList',
 ┊34┊34┊        'Cannot make the last public list private.');
 ┊35┊35┊    }
 ┊36┊36┊
-┊37┊  ┊    Lists.update(listId, {
+┊  ┊37┊    Lists.collection.update(listId, {
 ┊38┊38┊      $set: { userId: this.userId },
 ┊39┊39┊    });
 ┊40┊40┊  },
```
```diff
@@ -49,7 +49,7 @@
 ┊49┊49┊        'Must be logged in.');
 ┊50┊50┊    }
 ┊51┊51┊
-┊52┊  ┊    const list = Lists.findOne(listId);
+┊  ┊52┊    const list = Lists.collection.findOne(listId);
 ┊53┊53┊
 ┊54┊54┊    if (!list.editableBy(this.userId)) {
 ┊55┊55┊      throw new Meteor.Error('lists.makePublic.accessDenied',
```
```diff
@@ -58,7 +58,7 @@
 ┊58┊58┊
 ┊59┊59┊    // XXX the security check above is not atomic, so in theory a race condition could
 ┊60┊60┊    // result in exposing private data
-┊61┊  ┊    Lists.update(listId, {
+┊  ┊61┊    Lists.collection.update(listId, {
 ┊62┊62┊      $unset: { userId: true },
 ┊63┊63┊    });
 ┊64┊64┊  },
```
```diff
@@ -71,7 +71,7 @@
 ┊71┊71┊    newName: { type: String },
 ┊72┊72┊  }).validator(),
 ┊73┊73┊  run({ listId, newName }) {
-┊74┊  ┊    const list = Lists.findOne(listId);
+┊  ┊74┊    const list = Lists.collection.findOne(listId);
 ┊75┊75┊
 ┊76┊76┊    if (!list.editableBy(this.userId)) {
 ┊77┊77┊      throw new Meteor.Error('lists.updateName.accessDenied',
```
```diff
@@ -81,7 +81,7 @@
 ┊81┊81┊    // XXX the security check above is not atomic, so in theory a race condition could
 ┊82┊82┊    // result in exposing private data
 ┊83┊83┊
-┊84┊  ┊    Lists.update(listId, {
+┊  ┊84┊    Lists.collection.update(listId, {
 ┊85┊85┊      $set: { name: newName },
 ┊86┊86┊    });
 ┊87┊87┊  },
```
```diff
@@ -91,7 +91,7 @@
 ┊91┊91┊  name: 'lists.remove',
 ┊92┊92┊  validate: LIST_ID_ONLY,
 ┊93┊93┊  run({ listId }) {
-┊94┊  ┊    const list = Lists.findOne(listId);
+┊  ┊94┊    const list = Lists.collection.findOne(listId);
 ┊95┊95┊
 ┊96┊96┊    if (!list.editableBy(this.userId)) {
 ┊97┊97┊      throw new Meteor.Error('lists.remove.accessDenied',
```
```diff
@@ -106,7 +106,7 @@
 ┊106┊106┊        'Cannot delete the last public list.');
 ┊107┊107┊    }
 ┊108┊108┊
-┊109┊   ┊    Lists.remove(listId);
+┊   ┊109┊    Lists.collection.remove(listId);
 ┊110┊110┊  },
 ┊111┊111┊});
```
[}]: # 

Let's implement `logout` method:

[{]: <helper> (diff_step 10.15)
#### Step 10.15: Added logout logic

##### Changed client/imports/main.component.ts
```diff
@@ -60,4 +60,9 @@
 ┊60┊60┊
 ┊61┊61┊    this.router.navigate(['/lists', listId]);
 ┊62┊62┊  }
+┊  ┊63┊
+┊  ┊64┊  logout() {
+┊  ┊65┊    Meteor.logout();
+┊  ┊66┊    this.router.navigate(['/']);
+┊  ┊67┊  }
 ┊63┊68┊}🚫↵
```
[}]: # 

And bind the click event to the method:

[{]: <helper> (diff_step 10.16)
#### Step 10.16: Added logout event

##### Changed client/imports/main-component.ng2.html
```diff
@@ -7,7 +7,7 @@
 ┊ 7┊ 7┊
 ┊ 8┊ 8┊                {{ userEmail }}
 ┊ 9┊ 9┊            </a>
-┊10┊  ┊            <a *ngIf="userMenuOpen" class="js-logout btn-secondary">Logout</a>
+┊  ┊10┊            <a *ngIf="userMenuOpen" class="js-logout btn-secondary" (click)="logout()">Logout</a>
 ┊11┊11┊        </div>
 ┊12┊12┊        <div *ngIf="!currentUser" class="btns-group">
 ┊13┊13┊            <a routerLink="/signin" class="btn-secondary">Sign In</a>
```
[}]: # 

> The only missing thing at the moment is the `currentUser` field in this Component - we will add it in the next step.

Now we can remove the old Blaze Templates from the project (commit #6.17).

So at the moment, we have fully migrated Blaze Template and all the application features works as before!

[}]: #
[{]: <region> (footer)
[{]: <helper> (nav_step)
| [< Previous Step](step9.md) | [Next Step >](step11.md) |
|:--------------------------------|--------------------------------:|
[}]: #
[}]: #