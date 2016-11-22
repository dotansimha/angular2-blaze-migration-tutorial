[{]: <region> (header)
# Step 4: Coexistence
[}]: #
[{]: <region> (body)
This chapter will teach you how to add Angular 2 to your Blaze application and how to use both platforms at the same time.

We need coexistence of this two platform because we want to update our components step-by-step.

## What it takes?

To achieve coexistence, we need to understand few things:

1. Both Angular 2 and Blaze have a HTML files compiler - which means that we need to find a way to make a difference between the two HTML file types.

2. Angular 2 application usually written in TypeScript, while Blaze application written in ES2016 - so need need to make sure we can run both at the same time.

## How to start?

First, let's solve the HTML issue.

Your Blaze project already uses `blaze-html-templates` package, and it compiles files with `.html` extensions which means that we can't use that extension for Angular 2 HTML files.

Angular 2 has it's own HTML compiler package for Meteor, which is a part of Angular2-Meteor stack - it called `angular2-compilers`, but we can't use it because it also handles `.html` files - and Meteor allow only one compiler for each extensions.

Our solution is this case is to use `angular2-with-blaze-compilers` package, which is similar to the original package - only uses the `.ng2.html` extension instead.

> The compilers package contains compilers for LESS, TypeScript, HTML and templates files.

So let's add the package to our project:

       meteor add angular2-with-blaze-compilers

> Make sure that use Meteor >= 1.3.1 in your project.

If you already have in your project any other package that handles TypeScript or LESS files, please remove those packages by using `meteor remove` command.

#### How to know if it works?

Create a file named `client/angular-test.ng2.html` and put any content you want inside of it - now go to your browser and try to open the following URL:

http://localhost:3000/client/angular-test.html

> Note that we access the file without the `.ng2` in the browser! the `.ng2` is only there for the compiler to understand that this file is Angular 2 HTML template.

#### Adding Angular 2 and Angular2-Meteor

So now our application is capable to use both Angular 2 and Blaze at the same time - we are only missing the actual Angular 2 package.

We will add Angular2-Meteor and Angular 2 core from NPM:

    meteor npm install --save angular2-meteor babel-runtime @angular/core @angular/compiler @angular/common @angular/router @angular/platform-browser @angular/platform-browser-dynamic @angular/forms meteor-rxjs reflect-metadata rxjs zone.js

> This will install Angular2-Meteor, Angular 2 core, Angular 2 router and polyfills that required to run Angular2-Meteor.

In this example, the To-do app already have a dependency for LESS, so we need to remove it because the `angular2-with-blaze-compilers` already compilers them to match Angular 2 stylesheets.

So let's remove it:

    meteor remove less

> That's it! now our app can run both Angular 2 and Blaze and we can start coding!

## How to start?

So now we need to create Angular 2 application in order to begin with the migration.

The first thing that we need to do is to create main file that creates the application, but still have the ability to run the original Blaze application.

This is little bit tricky and our goal here is to wrap the Blaze application with an Angular 2 application.

The next step of this tutorial will cover step-by-step migration tutorial, and you can find there the instructions for creating Angular 2 app.

## Blaze Template inside Angular 2 Components

Angular2-Meteor team also provides a solution for step-by-step migration, so you can create Angular 2 application around your current Blaze application, and load your already exists and implemented code into Angular 2.

In order to use this feature, let's add `angular2-blaze-template` package to the project:

    meteor npm install --save angular2-blaze-template

The usage is simple, you just need to provide the name of the Template and optional context object.

You will see in the next chapters that we will use this in the first steps of the migration.

[}]: #
[{]: <region> (footer)
[{]: <helper> (nav_step)
| [< Previous Step](step3.md) | [Next Step >](step5.md) |
|:--------------------------------|--------------------------------:|
[}]: #
[}]: #