[{]: <region> (header)
# Step 7: Router Migration
[}]: #
[{]: <region> (body)
First step of migration is to migrate the Router.

Our example To-do application uses *FlowRouter* in order to define it's routes, we can see the definitions in `/imports/startup/client/routes.js`.

Our goal now is to migrate the router into Angular 2 Router - this step is very important and we need to do it first in order to load later Angular 2 Components with Blaze Template inside them.

So let's start by commenting or removing the FlowRouter definitions:

[{]: <helper> (diff_step 7.1)
#### Step 7.1: Commented all the FlowRouter definitions

##### Changed imports/startup/client/routes.js
```diff
@@ -11,6 +11,7 @@
 ┊11┊11┊// Import to override accounts templates
 ┊12┊12┊import '../../ui/accounts/accounts-templates.js';
 ┊13┊13┊
+┊  ┊14┊/*
 ┊14┊15┊FlowRouter.route('/lists/:_id', {
 ┊15┊16┊  name: 'Lists.show',
 ┊16┊17┊  action() {
```
```diff
@@ -48,3 +49,4 @@
 ┊48┊49┊  name: 'resetPwd',
 ┊49┊50┊  path: '/reset-password',
 ┊50┊51┊});
+┊  ┊52┊*/🚫↵
```
[}]: # 

And now let's define those routes using Angular 2 Router - the definition in a new file that in charge of the routes.

We will start with a single route which in charge of the list view.

Our goal is to create a route to display a specific To-do list, and we will later redirect to this page by default with a random list.

[{]: <helper> (diff_step 7.2)
#### Step 7.2: Added routes definitions using Angular 2 router

##### Added client/imports/app.routes.ts
```diff
@@ -0,0 +1,8 @@
+┊ ┊1┊import {ModuleWithProviders} from '@angular/core';
+┊ ┊2┊import {Routes, RouterModule} from '@angular/router';
+┊ ┊3┊
+┊ ┊4┊const appRoutes: Routes = [
+┊ ┊5┊    {path: 'lists/:_id', component: ListShowComponent}
+┊ ┊6┊];
+┊ ┊7┊
+┊ ┊8┊export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
```
[}]: # 

Angular 2 routes creates a NgModule with our routes defined, so we need to import it into our module under `imports`:

[{]: <helper> (diff_step 7.3)
#### Step 7.3: Imported the routes files into the module

##### Changed client/imports/app.module.ts
```diff
@@ -1,6 +1,7 @@
 ┊1┊1┊import {NgModule} from '@angular/core';
 ┊2┊2┊import {BrowserModule} from '@angular/platform-browser';
 ┊3┊3┊import {MainComponent} from "./main.component";
+┊ ┊4┊import {routing} from "./app.routes";
 ┊4┊5┊
 ┊5┊6┊@NgModule({
 ┊6┊7┊    // Components, Pipes, Directive
```
```diff
@@ -15,7 +16,8 @@
 ┊15┊16┊    providers: [],
 ┊16┊17┊    // Modules
 ┊17┊18┊    imports: [
-┊18┊  ┊        BrowserModule
+┊  ┊19┊        BrowserModule,
+┊  ┊20┊        routing
 ┊19┊21┊    ],
 ┊20┊22┊    // Main Component
 ┊21┊23┊    bootstrap: [MainComponent]
```
[}]: # 

Also, we need to add `<base>` tag in our `<head>` for the router:

[{]: <helper> (diff_step 7.4)
#### Step 7.4: Added base tag

##### Changed client/index.ng2.html
```diff
@@ -5,6 +5,7 @@
 ┊ 5┊ 5┊  <meta name="viewport" content="user-scalable=no, initial-scale=1, minimal-ui, maximum-scale=1, minimum-scale=1" />
 ┊ 6┊ 6┊  <link rel="shortcut icon" type="image/png" href="favicon.png?v1" sizes="16x16 32x32 64x64">
 ┊ 7┊ 7┊  <link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-precomposed.png">
+┊  ┊ 8┊  <base href="/">
 ┊ 8┊ 9┊</head>
 ┊ 9┊10┊<body>
 ┊10┊11┊    <app></app>
```
[}]: # 

Noticed that we used a new component in the routes? `ListShowComponent` - let's create a stub component for this component (we will implement it later).

[{]: <helper> (diff_step 7.5)
#### Step 7.5: Created a stub for ListShowComponent

##### Added client/imports/components/list-show.component.ts
```diff
@@ -0,0 +1,8 @@
+┊ ┊1┊import {Component} from "@angular/core";
+┊ ┊2┊
+┊ ┊3┊@Component({
+┊ ┊4┊    template: 'Hello ListShow!'
+┊ ┊5┊})
+┊ ┊6┊export class ListShowComponent {
+┊ ┊7┊
+┊ ┊8┊}🚫↵
```
[}]: # 

And now let's import this component in the routes file, and we need to declare that Component in our NgModule `declarations`:


[{]: <helper> (diff_step 7.6)
#### Step 7.6: Added router imports

##### Changed client/imports/app.module.ts
```diff
@@ -2,11 +2,13 @@
 ┊ 2┊ 2┊import {BrowserModule} from '@angular/platform-browser';
 ┊ 3┊ 3┊import {MainComponent} from "./main.component";
 ┊ 4┊ 4┊import {routing} from "./app.routes";
+┊  ┊ 5┊import {ListShowComponent} from "./components/list-show.component";
 ┊ 5┊ 6┊
 ┊ 6┊ 7┊@NgModule({
 ┊ 7┊ 8┊    // Components, Pipes, Directive
 ┊ 8┊ 9┊    declarations: [
-┊ 9┊  ┊        MainComponent
+┊  ┊10┊        MainComponent,
+┊  ┊11┊        ListShowComponent
 ┊10┊12┊    ],
 ┊11┊13┊    // Entry Components
 ┊12┊14┊    entryComponents: [
```

##### Changed client/imports/app.routes.ts
```diff
@@ -1,5 +1,6 @@
 ┊1┊1┊import {ModuleWithProviders} from '@angular/core';
 ┊2┊2┊import {Routes, RouterModule} from '@angular/router';
+┊ ┊3┊import {ListShowComponent} from "./components/list-show.component";
 ┊3┊4┊
 ┊4┊5┊const appRoutes: Routes = [
 ┊5┊6┊    {path: 'lists/:_id', component: ListShowComponent}
```
[}]: #

Now we need to point Angular 2 routes where to insert the route component, so we need to use `router-outlet` directive in our main component:

[{]: <helper> (diff_step 7.7)
#### Step 7.7: Added router-outlet directive

##### Changed client/imports/main.component.ts
```diff
@@ -3,7 +3,7 @@
 ┊3┊3┊
 ┊4┊4┊@Component({
 ┊5┊5┊  selector: 'app',
-┊6┊ ┊  template: ''
+┊ ┊6┊  template: '<router-outlet></router-outlet>'
 ┊7┊7┊})
 ┊8┊8┊export class MainComponent {
 ┊9┊9┊}🚫↵
```
[}]: # 

So now our app should be empty, because non of the existing Blaze Templates loaded (they were loaded by the Router according to the current URL).

In the next step we will load the Blaze Template into our route.

[}]: #
[{]: <region> (footer)
[{]: <helper> (nav_step)
| [< Previous Step](step6.md) | [Next Step >](step8.md) |
|:--------------------------------|--------------------------------:|
[}]: #
[}]: #