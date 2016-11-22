First, let's create Angular 2 basic component in the `client/main.component.ts` file:

{{{diff_step 6.1}}}

We we later include this main component inside our main module - but we will start with the Component.

Let's understand what do we have here - `MainComponent` created as component, with the `app` tag selector.

Now we need to use the `<app>` tag in order to load the application.

In order to do so, we first need to change the main HTML file name, and add `.ng2` to the extension, so it will compile as Angular 2 template:

{{{diff_step 6.2}}}

> We also changed the name from "head" to "index" - it's optional.

Now we need to we the `<app>` tag, so let's add `<body>` to the main HTML file and add the tag inside:

{{{diff_step 6.3}}}

Great. now we need to create NgModule which is an Angular 6.module - a wrapper that bundles together Component, Directives, Pipes and Providers. This is the object we will init and create an instance of - and this will be our main entry point.

So let's create it:

{{{diff_step 6.4}}}

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

{{{diff_step 6.6}}}

That's it - we have a work NgModule with a Component!
