So now we will take care of the authentication Blaze Templates, such as Join and Signup.

We already created a stub Angular 2 Components for them - we just need to implement them now.

This Todos project uses AccountTemplates package, which has a default style templates for signin and join pages - we do not want to use those and we want to implement it with Angular 2.

The style and template defined in `imports/ui/accounts/accounts-templates.html` and we will copy the thing we need and create a new Angular 2 template file that looks the same.

{{{diff_step 11.1}}} 

So this is the basic layout without the actual form fields, let's use it:

{{{diff_step 11.2}}} 

Now let's add the actual form:

{{{diff_step 11.3}}} 

Let's understand what do we have here:

- A form, that registers an event `ngSubmit` to the Component method `join`, and we give it a name `joinForm` using variable reference ([more info here](https://angular.io/docs/ts/latest/guide/template-syntax.html))
- 3 inputs for email, password and verify password, that declared as `ngControl` which indicate that this input related to the form and effect it's validation.
- We also use two-way binding using `ngModel` for the inputs.
- Button of type `submit` that disabled when the form is not valid.

Great, now we need to add some code to the form:

- Handle errors using `errors` array.
- Implement `join()` method and create the actual user when join.
- Create a model object with our fields (email, password, verifyPassword) - note that this is optional and you can just use regular object.
- Use router to navigate the user to the main page after joining.

So let's do it:

{{{diff_step 11.4}}} 

And we also need to add an import for Angular 2 Forms Module, so let's do it:

{{{diff_step 11.5}}} 

This Todo base project uses packages that intent to help developing Blaze Template with Meteor Accounts, and we no longer need it, and it is also "takes control" of sign-up, so we need to remove it.

So let's remove those packages, by running:

    meteor remove useraccounts:unstyled useraccounts:flow-routing softwarerero:accounts-t9n

And we also perform some cleanup and remove some files that uses this packages - you can see those modifications in commit #7.6 (or [here](https://github.com/dotansimha/angular2-blaze-migration-tutorial/commit/6c1bab196ba03c8f5d2e933644411733acd62272))

Great! now we need to make sure that there is an indication for the user that he's logged in, so let's go back to `MainContainerComponent` and and add `currentUser` field:

{{{diff_step 11.7}}} 

> We put that code inside `autorun` because we want it to update when the user login or logout.

Now we should be able to see the user's name if the main page - the only missing thing is to fix and add toggle for the user menu:

{{{diff_step 11.8}}} 

Now, let's do the same for the `SigninComponent` - it's very similar:

{{{diff_step 11.9}}} 

And the Component:

{{{diff_step 11.10}}} 

That's it! we implemented the join/signin forms with Angular 2 !
