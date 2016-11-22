[{]: <region> (header)
# Step 9: Load Blaze Template
[}]: #
[{]: <region> (body)
So now we get to the list page, but it's empty! we need to load the existing Blaze Template into our Component.

First, we need to use the Router parameter (in the URL) in order to get the ID of the list.

Let's do it:

[{]: <helper> (diff_step 9.1)
#### Step 9.1: Get the ID of the list from the router

##### Changed client/imports/components/list-show.component.ts
```diff
@@ -1,8 +1,17 @@
-┊ 1┊  ┊import {Component} from "@angular/core";
+┊  ┊ 1┊import {Component, OnInit} from "@angular/core";
+┊  ┊ 2┊import {ActivatedRoute, Params} from "@angular/router";
 ┊ 2┊ 3┊
 ┊ 3┊ 4┊@Component({
 ┊ 4┊ 5┊    template: 'Hello ListShow!'
 ┊ 5┊ 6┊})
-┊ 6┊  ┊export class ListShowComponent {
+┊  ┊ 7┊export class ListShowComponent implements OnInit {
+┊  ┊ 8┊    constructor(private currentRoute: ActivatedRoute) {
 ┊ 7┊ 9┊
+┊  ┊10┊    }
+┊  ┊11┊
+┊  ┊12┊    ngOnInit() {
+┊  ┊13┊        this.currentRoute.params.subscribe((params: Params) => {
+┊  ┊14┊            const listId = params['_id'];
+┊  ┊15┊        })
+┊  ┊16┊    }
 ┊ 8┊17┊}🚫↵
```
[}]: # 

And now we need to load the existing Blaze Template called `App_body` and with context.

[{]: <helper> (diff_step 9.2)
#### Step 9.2: Added blaze-template with it's context

##### Changed client/imports/components/list-show.component.ts
```diff
@@ -2,9 +2,11 @@
 ┊ 2┊ 2┊import {ActivatedRoute, Params} from "@angular/router";
 ┊ 3┊ 3┊
 ┊ 4┊ 4┊@Component({
-┊ 5┊  ┊    template: 'Hello ListShow!'
+┊  ┊ 5┊    template: '<blaze-template *ngIf="templateContext" name="App_body" [context]="templateContext"></blaze-template>'
 ┊ 6┊ 6┊})
 ┊ 7┊ 7┊export class ListShowComponent implements OnInit {
+┊  ┊ 8┊    private templateContext: any;
+┊  ┊ 9┊
 ┊ 8┊10┊    constructor(private currentRoute: ActivatedRoute) {
 ┊ 9┊11┊
 ┊10┊12┊    }
```
```diff
@@ -12,6 +14,11 @@
 ┊12┊14┊    ngOnInit() {
 ┊13┊15┊        this.currentRoute.params.subscribe((params: Params) => {
 ┊14┊16┊            const listId = params['_id'];
-┊15┊  ┊        })
+┊  ┊17┊
+┊  ┊18┊            this.templateContext = {
+┊  ┊19┊                main: "Lists_show_page",
+┊  ┊20┊                _id: listId
+┊  ┊21┊            };
+┊  ┊22┊        });
 ┊16┊23┊    }
 ┊17┊24┊}🚫↵
```
[}]: # 

> We use `App_body` because the architecture of the To-do is to load this template and dynamically load a child template that comes from the `main` property of the Template context.

The context of the Template is it's `this.data` that Blaze developers already familiar with, and we use it to pass the child Blaze Template we want to load (`Lists_show_page`) and the `_id` of the choosen list.

Great, now we are missing only one step to make it work.

The `Lists_show_page` Template (`imports/ui/pages/lists-show-page.js`) loads the ID of the list from the `FlowRouter`, and now it can load it from the `this.data` object, so let's change it:

[{]: <helper> (diff_step 9.3)
#### Step 9.3: Changed the way of getting the list ID

##### Changed imports/ui/pages/lists-show-page.js
```diff
@@ -11,7 +11,7 @@
 ┊11┊11┊import '../components/lists-show.js';
 ┊12┊12┊
 ┊13┊13┊Template.Lists_show_page.onCreated(function listsShowPageOnCreated() {
-┊14┊  ┊  this.getListId = () => FlowRouter.getParam('_id');
+┊  ┊14┊  this.getListId = () => this.data._id;
 ┊15┊15┊
 ┊16┊16┊  this.autorun(() => {
 ┊17┊17┊    this.subscribe('todos.inList', this.getListId());
```
[}]: # 

We used an external Component, so we need to imports it's NgModule:

[{]: <helper> (diff_step 9.4)
#### Step 9.4: Imported the Blaze template component module into the app

##### Changed client/imports/app.module.ts
```diff
@@ -4,6 +4,7 @@
 ┊ 4┊ 4┊import {routing} from "./app.routes";
 ┊ 5┊ 5┊import {ListShowComponent} from "./components/list-show.component";
 ┊ 6┊ 6┊import {ListRedirectorComponent} from "./components/list-redirector.component";
+┊  ┊ 7┊import {Angular2BlazeTemplateModule} from "angular2-blaze-template";
 ┊ 7┊ 8┊
 ┊ 8┊ 9┊@NgModule({
 ┊ 9┊10┊    // Components, Pipes, Directive
```
```diff
@@ -21,7 +22,8 @@
 ┊21┊22┊    // Modules
 ┊22┊23┊    imports: [
 ┊23┊24┊        BrowserModule,
-┊24┊  ┊        routing
+┊  ┊25┊        routing,
+┊  ┊26┊        Angular2BlazeTemplateModule
 ┊25┊27┊    ],
 ┊26┊28┊    // Main Component
 ┊27┊29┊    bootstrap: [MainComponent]
```
[}]: # 

In this point - we have a fully working Angular 2 application that wraps the Blaze application!

In the next steps, we will start to migrate and rewrite our Blaze Templates.

[}]: #
[{]: <region> (footer)
[{]: <helper> (nav_step)
| [< Previous Step](step8.md) | [Next Step >](step10.md) |
|:--------------------------------|--------------------------------:|
[}]: #
[}]: #