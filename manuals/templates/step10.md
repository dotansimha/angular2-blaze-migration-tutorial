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

{{{diff_step 10.1}}} 

> Note that unlike Blaze, in Angular 2 we define events such click in the HTML - we will handle that later.

So now we have the HTML template - we need to add some code to the Angular 2 Component:

- We need to use the new template.
- We need to add stubs for the methods we use in the template (`isConnected`, getter for `userEmail`)

So let's do it:

{{{diff_step 10.2}}} 

> We also commented the code that in charge of redirection to a list page, we will handle that later.

Now, because we are implementing a replacement for App_body, we need to load the inner Template instead of the App_Body, so let's change it:

{{{diff_step 10.3}}} 

Now, we need to provide the `lists` object to the view - this will be that lists of Todo lists.

We will use MeteorObservable again, and create the `lists` as an Observable of the data in the Cursor (we will change the implementation of the Collection soon to support RxJS).

> Because our MongoDB selector is depend on the use connection, and we want to update it when the user log in/out, we need to wrap our query with `Tracker.autorun`.

{{{diff_step 10.4}}} 

> We used the `zone()` method in order to bind the async data fetch to the Angular 2 Zone of the current Component - so when the data changes - the Zone will trigger an update - and the view will update.

Now we need to change the `Mongo.Collection` creation in order to have a Collection with RxJS API - there are multiple ways of doing it - in this case, we just wrap the existing Collection:

{{{diff_step 10.5}}} 

> You can use the `collection` property of the instance in order to get the actual `Mongo.Collection` that wrapped.

Now let's implement the stub methods we created earlier, starting with `isConnected`:

{{{diff_step 10.6}}} 

And the getter `userEmail`:

{{{diff_step 10.7}}} 

Now let's keep implementing the missing logic in our `MainComponent` - starting with the router links and the active route indication:

{{{diff_step 10.8}}} 

We used a new Routes that not yet implemented - signin and join - so let's create stubs for them:

{{{diff_step 10.9}}} 

And let's add them to the NgModule declaration:

{{{diff_step 10.10}}} 

And let's add the routes to the Router definition:

{{{diff_step 10.11}}} 

Let's implement `addNewList` action in our Component, which uses the existing logic from the old Blaze code:

{{{diff_step 10.12}}} 

And let's bind the action in the view:

{{{diff_step 10.13}}} 

We need to make some changes in the implementation of the `methods.js` file, because we wrapped the collection with RxJS collection, so let's change the usage to use the actual Mongo.Collection object:

{{{diff_step 10.14}}} 

Let's implement `logout` method:

{{{diff_step 10.15}}} 

And bind the click event to the method:

{{{diff_step 10.16}}} 

> The only missing thing at the moment is the `currentUser` field in this Component - we will add it in the next step.

Now we can remove the old Blaze Templates from the project (commit #6.17).

So at the moment, we have fully migrated Blaze Template and all the application features works as before!
