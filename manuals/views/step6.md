[{]: <region> (header)
# Step 6: Creating Angular 2 Application
[}]: #
[{]: <region> (body)
First, let's create Angular 2 basic component in the `client/main.component.ts` file:

[{]: <helper> (diff_step 6.1)
#### Step 6.1: Create the MainComponent

##### Changed client/main.component.ts
```diff
@@ -1 +1,9 @@
 ┊1┊1┊import '/imports/startup/client';
+┊ ┊2┊import {Component} from "@angular/core";
+┊ ┊3┊
+┊ ┊4┊@Component({
+┊ ┊5┊  selector: 'app',
+┊ ┊6┊  template: ''
+┊ ┊7┊})
+┊ ┊8┊export class MainComponent {
+┊ ┊9┊}🚫↵
```
[}]: #

We we later include this main component inside our main module - but we will start with the Component.

Let's understand what do we have here - `MainComponent` created as component, with the `app` tag selector.

Now we need to use the `<app>` tag in order to load the application.

In order to do so, we first need to change the main HTML file name, and add `.ng2` to the extension, so it will compile as Angular 2 template:

[{]: <helper> (diff_step 6.2)
#### Step 6.2: Changed the name of the main HTML file

##### Changed client/head.html

[}]: #

> We also changed the name from "head" to "index" - it's optional.

Now we need to we the `<app>` tag, so let's add `<body>` to the main HTML file and add the tag inside:

[{]: <helper> (diff_step 6.3)
#### Step 6.3: Added app tag to the main HTML file

##### Changed client/index.ng2.html
```diff
@@ -5,4 +5,7 @@
 ┊ 5┊ 5┊  <meta name="viewport" content="user-scalable=no, initial-scale=1, minimal-ui, maximum-scale=1, minimum-scale=1" />
 ┊ 6┊ 6┊  <link rel="shortcut icon" type="image/png" href="favicon.png?v1" sizes="16x16 32x32 64x64">
 ┊ 7┊ 7┊  <link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-precomposed.png">
-┊ 8┊  ┊</head>🚫↵
+┊  ┊ 8┊</head>
+┊  ┊ 9┊<body>
+┊  ┊10┊    <app></app>
+┊  ┊11┊</body>🚫↵
```
[}]: #

Great. now we need to create NgModule which is an Angular 6.module - a wrapper that bundles together Component, Directives, Pipes and Providers. This is the object we will init and create an instance of - and this will be our main entry point.

So let's create it:

[{]: <helper> (diff_step 6.4)
#### Step 6.4: Create the app NgModule

##### Added client/app.module.ts
```diff
@@ -0,0 +1,24 @@
+┊  ┊ 1┊import {NgModule} from '@angular/core';
+┊  ┊ 2┊import {BrowserModule} from '@angular/platform-browser';
+┊  ┊ 3┊import {MainComponent} from "./main.component";
+┊  ┊ 4┊
+┊  ┊ 5┊@NgModule({
+┊  ┊ 6┊    // Components, Pipes, Directive
+┊  ┊ 7┊    declarations: [
+┊  ┊ 8┊        MainComponent
+┊  ┊ 9┊    ],
+┊  ┊10┊    // Entry Components
+┊  ┊11┊    entryComponents: [
+┊  ┊12┊        MainComponent
+┊  ┊13┊    ],
+┊  ┊14┊    // Providers
+┊  ┊15┊    providers: [],
+┊  ┊16┊    // Modules
+┊  ┊17┊    imports: [
+┊  ┊18┊        BrowserModule
+┊  ┊19┊    ],
+┊  ┊20┊    // Main Component
+┊  ┊21┊    bootstrap: [MainComponent]
+┊  ┊22┊})
+┊  ┊23┊export class AppModule {
+┊  ┊24┊}🚫↵
```
[}]: #

We declared some properties in our NgModule:

- declarations - these are our Component, Directives and Pipes, we declare them here and we wont need to import them later.
- entryComponents - declared the main entry components.
- providers - these are the Providers, Services of the app.
- imports - external NgModules we want to include.
- bootstrap - the main Component to bootstrap.

You can read more about NgModule and it's properties in [Angular 2 NgModule docs](https://angular.io/docs/ts/latest/guide/ngmodule.html).

Our next step is a bit of maintenance - we will move any import we use into `client/imports` because of Meteor's behavior.

Any future components we will create will go into this folder - and our NgModule file too.

Now we need to create a single entry point for the client side, which is the only TypeScripts file that won't go inside the `imports` directory - `client/main.ts`.

The main.ts file will also initialize our NgModule:

[{]: <helper> (diff_step 6.6)
#### Step 6.6: Created the main bootstrap file for the AppModule

##### Added client/main.ts
```diff
@@ -0,0 +1,9 @@
+┊ ┊1┊import 'reflect-metadata';
+┊ ┊2┊import 'zone.js/dist/zone.js';
+┊ ┊3┊import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
+┊ ┊4┊import {enableProdMode} from '@angular/core';
+┊ ┊5┊import {AppModule} from "./imports/app.module";
+┊ ┊6┊
+┊ ┊7┊enableProdMode();
+┊ ┊8┊
+┊ ┊9┊platformBrowserDynamic().bootstrapModule(AppModule);🚫↵
```
[}]: #

That's it - we have a work NgModule with a Component!

[}]: #
[{]: <region> (footer)
[{]: <helper> (nav_step)
| [< Previous Step](step5.md) | [Next Step >](step7.md) |
|:--------------------------------|--------------------------------:|
[}]: #
[}]: #