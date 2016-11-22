So in this migration tutorial, we will migrate the Meteor's To-do example application - it is written in Meteor 1.3, with ES2016 code and Blaze.

Our goal here is to migrate this running app to Meteor 1.3 with TypeScript and Angular 2 - we will do it by adding Angular 2 to the existing Blaze application - run them both and replace a single part each time - until we will have full Angular 2 application.

We will try to cover as much as possible features in Blaze and Angular 2 that relevant for most of Blaze applications - and we might skip some special cases - but we hope that we will give you the basics that you need to migrate your application.

The code of the basic To-do application located [in this repository](https://github.com/meteor/todos), and if you want to keep with the step-by-step tutorial, we recommend to clone this repo, and keep with the steps in the tutorial.

## Prepare for migration

We recommend to map the parts of your code, and try to organize them before you start with the migration.

Try to find the important and the core that you need migrate first, and which parts of your application can be done in the end.

So let's try to go through the To-do app and understand it's basics:

#### Start point

We have a `client` directory with a main file, that loads the real main from the `imports/startup/client`.

The main file uses another file called `routes.js` that defines a route for `/` which is the main page of the application.

So when the router find the `/` URL, it loads the `App_body` Template to the view - which means that this is the start point of the application.

#### Routes

The `routers.js` file creates a main route (`/`) which is a page with list of todo lists.

Also, there is another route for the current selected to-do list.

So we know that we have 2 types of routes in the app: one for the main page, and route for each list.

#### Components

Next, let's try to understand the components that we have in the app.

We have the main HTML file with the list-of-lists in `imports/ui/layouts` which defined a template named `App_body`- it has some event handlers and helpers.

In `imports/ui/components/lists-show.js` we notice that we have `Lists_show` Template that in charge of displaying the selected todo-list and we do some stuff on it's creation and define some events.

In `imports/ui/components/todos-item.js` we have the Template that in charge of displaying a single todo item in a list (`Todos_item`).

So we can understand that we have 3 components (Main page, To-do list, To-do item) which are the most of the app.

We can find some more - but at the moment it is enough and we will take care of the rest later.

#### Users

You might also notice that this app allow the users to sign-up and login, so we know that we need components that handles this actions.

## Summary

So we are ready now for migrating our Blaze app to Angular 2, we managed to find and detect the main components, the routes we have, the user interaction (signup, login) and the start point of the application - so we can start and modifying these files to create our app.

We also understand that the main page components loads the todo-list component, and it loads the todo-item component - so we can understand the hierarchy and the relations of the components.
