So let's continue! now we will migrate the list of todo, so far we use an existing Blaze Template called `Lists_show_page` inside a new Angular 2 Component called `ListShowComponent`.

First, let's modify the template, we use the same techniques we learned in the previous steps - we will use the existing template and just change the events, bindings and directives:

{{{diff_step 12.1}}} 

And because we are using RxJS Observable as a wrapper for our data, we need to add `async` Pipe in our view, and let's migrate the Template code into a Component

{{{diff_step 12.2}}} 

> At the moment, we will use the exiting `Todo_item` template to show the items - we will later migrate it too - so we just pass the required params using `getContextForItem`.

And now let's implement and migrate the code into the Component's class, and let's add the events in the view

{{{diff_step 12.3}}} 

And remember we wrapped the Collection? we need to do the same for Todo Collection:

{{{diff_step 12.4}}} 

That's it! we can now remove the old files of this Template (`imports/ui/components/lists-show.html`, `imports/ui/components/lists-show.js`, `imports/ui/pages/lists-show-page.js`, `imports/ui/pages/lists-show-page.html`), and we can removed the imports for those files from the routes file (`imports/startup/client/routes.js`).
