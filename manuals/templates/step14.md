So now that we are done with the migration, we need to perform some clean-ups and make sure that we remove all the old files.

Let's join all the stylesheets we need under the same directory - `imports/stylesheets/`, now they are in `imports/ui/stylesheets/` (commit #10.1).

> Make sure to also take `imports/ui/components/lists-show.less` !

And we also need to update the imports in the main less file:

{{{diff_step 14.2}}} 

Now we can remove all the files we no longer use from `imports/ui/` directory - which are ALL of the files, except `errors.js` which we use, so let's move it to `/imports/` directory first, and them remove `imports/ui/` directory (commit #10.4).

We can also removed all client startup files (`imports/startup/client`), since we no longer use them (in commit #10.3).

And let's update the imports of `errors.js` file:

{{{diff_step 14.5}}} 

We can also now remove Meteor packages we no longer use that related to Blaze or Router!

So let's do it by running:

    meteor remove blaze-html-templates aldeed:template-extension kadira:flow-router kadira:blaze-layout arillo:flow-router-helpers zimme:active-route

And now we can also use the regular Angular 2 compilers package, so let's remove the old one and use the regular one:

    meteor remove angular2-with-blaze-compilers
    meteor add angular2-compilers less

And the last step, is to remove `.ng2` from the HTML files extension and update it to be `.html`, remember also to update it in the Component `templateUrl` !

We can also remove the import of Blaze Template from the MainComponent:

{{{diff_step 14.6}}} 

That's it! In the next chapter we will take about the next step of migration from Blaze to Angular 2.
