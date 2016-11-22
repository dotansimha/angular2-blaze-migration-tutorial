[{]: <region> (header)
# Step 8: Migrate the main Blaze Template
[}]: #
[{]: <region> (body)
So let's create a new Component, named `ListRedirectorComponent` - this Component will find a default list, and redirect to it - we will use it as a default route (`/`) later.

[{]: <helper> (diff_step 8.1)
#### Step 8.1: Added ListRedirector component

##### Added client/imports/components/list-redirector.component.ts
```diff
@@ -0,0 +1,17 @@
+┊  ┊ 1┊import {Component} from "@angular/core";
+┊  ┊ 2┊import {Router} from "@angular/router";
+┊  ┊ 3┊import {Meteor} from "meteor/meteor";
+┊  ┊ 4┊import {Lists} from "../../../imports/api/lists/lists";
+┊  ┊ 5┊
+┊  ┊ 6┊@Component({
+┊  ┊ 7┊    template: 'Loading...'
+┊  ┊ 8┊})
+┊  ┊ 9┊export class ListRedirectorComponent {
+┊  ┊10┊    constructor(private router: Router) {
+┊  ┊11┊        Meteor.autorun(() => {
+┊  ┊12┊            if (Lists.findOne()) {
+┊  ┊13┊                router.navigate(['/lists', Lists.findOne()._id]);
+┊  ┊14┊            }
+┊  ┊15┊        });
+┊  ┊16┊    }
+┊  ┊17┊}🚫↵
```
[}]: # 

> We are looking for a one record of a todo list, and when we have it - we will redirect to the `/lists` route when we have it.

> In this point, we still does not have a Meteor subscription and our Lists collection will be empty - don't worry - we will fix it soon.

> We also used `Tracker.autorun` to run that code when we get the actual data from the collection.

And let's add the new Component into the NgModule:

[{]: <helper> (diff_step 8.2)
#### Step 8.2: Added list redirector for the module

##### Changed client/imports/app.module.ts
```diff
@@ -3,12 +3,14 @@
 ┊ 3┊ 3┊import {MainComponent} from "./main.component";
 ┊ 4┊ 4┊import {routing} from "./app.routes";
 ┊ 5┊ 5┊import {ListShowComponent} from "./components/list-show.component";
+┊  ┊ 6┊import {ListRedirectorComponent} from "./components/list-redirector.component";
 ┊ 6┊ 7┊
 ┊ 7┊ 8┊@NgModule({
 ┊ 8┊ 9┊    // Components, Pipes, Directive
 ┊ 9┊10┊    declarations: [
 ┊10┊11┊        MainComponent,
-┊11┊  ┊        ListShowComponent
+┊  ┊12┊        ListShowComponent,
+┊  ┊13┊        ListRedirectorComponent
 ┊12┊14┊    ],
 ┊13┊15┊    // Entry Components
 ┊14┊16┊    entryComponents: [
```
[}]: # 

And now let's add it as default route to our routes file:

[{]: <helper> (diff_step 8.3)
#### Step 8.3: Added list redirector route as default route

##### Changed client/imports/app.routes.ts
```diff
@@ -1,8 +1,10 @@
 ┊1┊1┊import {ModuleWithProviders} from '@angular/core';
 ┊2┊2┊import {Routes, RouterModule} from '@angular/router';
 ┊3┊3┊import {ListShowComponent} from "./components/list-show.component";
+┊ ┊4┊import {ListRedirectorComponent} from "./components/list-redirector.component";
 ┊4┊5┊
 ┊5┊6┊const appRoutes: Routes = [
+┊ ┊7┊    {path: '', component: ListRedirectorComponent},
 ┊6┊8┊    {path: 'lists/:_id', component: ListShowComponent}
 ┊7┊9┊];
```
[}]: # 

Now, in order to get data in the collection, let's add a Meteor Subscription to the data:

[{]: <helper> (diff_step 8.4)
#### Step 8.4: Added data subscription on the main component

##### Changed client/imports/main.component.ts
```diff
@@ -1,9 +1,18 @@
 ┊ 1┊ 1┊import '/imports/startup/client';
-┊ 2┊  ┊import {Component} from "@angular/core";
+┊  ┊ 2┊import {Component, OnInit} from "@angular/core";
+┊  ┊ 3┊import {MeteorObservable} from "meteor-rxjs";
 ┊ 3┊ 4┊
 ┊ 4┊ 5┊@Component({
 ┊ 5┊ 6┊  selector: 'app',
 ┊ 6┊ 7┊  template: '<router-outlet></router-outlet>'
 ┊ 7┊ 8┊})
-┊ 8┊  ┊export class MainComponent {
+┊  ┊ 9┊export class MainComponent implements OnInit {
+┊  ┊10┊  constructor() {
+┊  ┊11┊
+┊  ┊12┊  }
+┊  ┊13┊
+┊  ┊14┊  ngOnInit() {
+┊  ┊15┊    MeteorObservable.subscribe("lists.public").subscribe();
+┊  ┊16┊    MeteorObservable.subscribe("lists.private").subscribe();
+┊  ┊17┊  }
 ┊ 9┊18┊}🚫↵
```
[}]: # 

We used `MeteorObservable` which is an implementation of Meteor that uses RxJS, so we subscribe the data from Meteor subscription, and the return value of it is an RxJS Observable object.

Then we use `subscribe()` again in order to run the actual logic and register to the data subscription.

> The RxJS Observable in this case, called when the Meteor Subscription is in "ready" state!

So now our default Component redirects to one of the lists page when it's loaded - let's continue!

[}]: #
[{]: <region> (footer)
[{]: <helper> (nav_step)
| [< Previous Step](step7.md) | [Next Step >](step9.md) |
|:--------------------------------|--------------------------------:|
[}]: #
[}]: #