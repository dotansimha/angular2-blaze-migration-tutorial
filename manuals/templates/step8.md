So let's create a new Component, named `ListRedirectorComponent` - this Component will find a default list, and redirect to it - we will use it as a default route (`/`) later.

{{{diff_step 8.1}}} 

> We are looking for a one record of a todo list, and when we have it - we will redirect to the `/lists` route when we have it.

> In this point, we still does not have a Meteor subscription and our Lists collection will be empty - don't worry - we will fix it soon.

> We also used `Tracker.autorun` to run that code when we get the actual data from the collection.

And let's add the new Component into the NgModule:

{{{diff_step 8.2}}} 

And now let's add it as default route to our routes file:

{{{diff_step 8.3}}} 

Now, in order to get data in the collection, let's add a Meteor Subscription to the data:

{{{diff_step 8.4}}} 

We used `MeteorObservable` which is an implementation of Meteor that uses RxJS, so we subscribe the data from Meteor subscription, and the return value of it is an RxJS Observable object.

Then we use `subscribe()` again in order to run the actual logic and register to the data subscription.

> The RxJS Observable in this case, called when the Meteor Subscription is in "ready" state!

So now our default Component redirects to one of the lists page when it's loaded - let's continue!
