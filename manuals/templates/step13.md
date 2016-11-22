Our last relevant Blaze Template is the list item - this is a little bit tricky because this template need to interact with the parent Component and get the actual Todo item, and also expose events for the parent Component - so we will use a new Angular 2 features called `Input` and `Output` for that.

So let's start with the Component migration this time:

{{{diff_step 13.1}}} 

We copied the code from the old Blaze Template, and added two `Input`s and one `Output` in the Component declaration:

- `todo` which is the actual todo item.
- `editing` which is an indication for the current item that being edited.
- `editChange` which is an event we expose to the parent Component that triggered when starting to edit an item in the list.

And add the new Component to the NgModule:

{{{diff_step 13.2}}} 

Now let's migrate the HTML Template of this Component:

{{{diff_step 13.3}}} 

And now we need to use this new Component in the `ListShowComponent`:

{{{diff_step 13.4}}} 

And let's implement the actual event handler and use declare the usage of the new Component:

{{{diff_step 13.5}}} 

And we are done! You can now remove all the files that related to the list item and removed it's import! (we did it in commit #9.6)
