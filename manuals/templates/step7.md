First step of migration is to migrate the Router.

Our example To-do application uses *FlowRouter* in order to define it's routes, we can see the definitions in `/imports/startup/client/routes.js`.

Our goal now is to migrate the router into Angular 2 Router - this step is very important and we need to do it first in order to load later Angular 2 Components with Blaze Template inside them.

So let's start by commenting or removing the FlowRouter definitions:

{{{diff_step 7.1}}} 

And now let's define those routes using Angular 2 Router - the definition in a new file that in charge of the routes.

We will start with a single route which in charge of the list view.

Our goal is to create a route to display a specific To-do list, and we will later redirect to this page by default with a random list.

{{{diff_step 7.2}}} 

Angular 2 routes creates a NgModule with our routes defined, so we need to import it into our module under `imports`:

{{{diff_step 7.3}}} 

Also, we need to add `<base>` tag in our `<head>` for the router:

{{{diff_step 7.4}}} 

Noticed that we used a new component in the routes? `ListShowComponent` - let's create a stub component for this component (we will implement it later).

{{{diff_step 7.5}}} 

And now let's import this component in the routes file, and we need to declare that Component in our NgModule `declarations`:


{{{diff_step 7.6}}}

Now we need to point Angular 2 routes where to insert the route component, so we need to use `router-outlet` directive in our main component:

{{{diff_step 7.7}}} 

So now our app should be empty, because non of the existing Blaze Templates loaded (they were loaded by the Router according to the current URL).

In the next step we will load the Blaze Template into our route.
