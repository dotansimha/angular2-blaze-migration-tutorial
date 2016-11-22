So now we get to the list page, but it's empty! we need to load the existing Blaze Template into our Component.

First, we need to use the Router parameter (in the URL) in order to get the ID of the list.

Let's do it:

{{{diff_step 9.1}}} 

And now we need to load the existing Blaze Template called `App_body` and with context.

{{{diff_step 9.2}}} 

> We use `App_body` because the architecture of the To-do is to load this template and dynamically load a child template that comes from the `main` property of the Template context.

The context of the Template is it's `this.data` that Blaze developers already familiar with, and we use it to pass the child Blaze Template we want to load (`Lists_show_page`) and the `_id` of the choosen list.

Great, now we are missing only one step to make it work.

The `Lists_show_page` Template (`imports/ui/pages/lists-show-page.js`) loads the ID of the list from the `FlowRouter`, and now it can load it from the `this.data` object, so let's change it:

{{{diff_step 9.3}}} 

We used an external Component, so we need to imports it's NgModule:

{{{diff_step 9.4}}} 

In this point - we have a fully working Angular 2 application that wraps the Blaze application!

In the next steps, we will start to migrate and rewrite our Blaze Templates.
