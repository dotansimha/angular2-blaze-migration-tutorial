
Now let's understand Angular 2 and how it's fundamentals are related to Blaze fundamentals.

## Angular 2 Architecture

We assume that you already familiar to the Blaze architecture and flow of data (as described [here](http://guide.meteor.com/blaze.html#understanding-blaze)).

Angular 2 architecture documentation is available [here](https://angular.io/docs/ts/latest/guide/architecture.html) and we recommend to go through it.

#### TL;DR

1. With Angular 2 we can create modules and libraries for better modularization of the code - while Blaze only provides a Template with code behind.

2. Angular 2 provides Components as class - Blaze calls it Spacebars and Helpers.

3. Angular 2 uses TypeScript and it's Decorators to describe and extend it's metadata for variables, methods and classes - Blaze uses JavaScript ES2016 without metadata feature.

4. Both provides the ability to create view binding and control it's flow and change detection.

5. In Blaze, templates can use another templates - Angular 2 provides Components and Directives that can load another view components.

6. Angular 2 provides a great Dependency Injection.

7. In Angular 2 you can create Pipes which are view transformation utilities - in Blaze it's just another helper for the view.

8. Angular 2 Services provides a great way share data and state between components and directives.

## Spacebars vs Angular 2 Template

Blaze uses Spacebars to describe it's UI and elements, usually as HTML content inside `<template>` tag, and with JavaScript code that extends the template with context and Helpers.

Angular 2 has a similar idea - the templates are inside HTML files, and TypeScript code creates a `class` that uses this template, and provides context (`this`) and properties which the view data.

Let's start with an example from Blaze's for a simple template:

    <template name="Example">
        { { myVar } }
    </template>

And the JavaScript code for this template:

    import { Template } from 'meteor/templating';

    Template.Example.helpers({
      myVar() {
        return "Hello World!";
      }
    });

We can see that we have a template file named "Example" that uses a helper named `myVar`.

This same code, will be a `Component` in Angular 2, that uses a template.

So the template will look like that:

    { { myVar } }

And the Components will look like that:

    import {Component} from '@angular/core';

    @Component({
        selector: 'example',
        templateUrl: './example.html'
    })
    class Example() {
        myVar : string;

        constructor() {
            this.myVar = "Hello World!";
        }
    }

Let's start with the similarities between these codes:

##### Language

If you use Meteor 1.3, you probably uses the ES2016 modules loader with the `import` keyword - Angular 2 usually goes with TypeScript, which have the same modules loader.

If you are using Meteor 1.2, you are probably uses variables that defined in the global scope and do not need the imports with Blaze, but note that you must use it when developing with Angular 2.

Blaze code mostly written with ES2016, and Angular 2 uses TypeScript that just provides extra features on top of ES2016.

##### View

The concepts of the view binding is very similar and starts with the very basic double curly braces to load a content variable into the view.

Later, we will go through more types of bindings and connection between the view and the content, and we will understand how to migrate every view binding that we use in our Blaze code.



*And now to the differences between the examples:*

##### Creation flow

We can see the difference in the creation flow of the component: in Blaze we create a template, and then attach properties to this template.

In Angular 2, each component is created as an instance of the class, and the Component loads the template and provides the properties to the view.

##### Defining view variables

In Blaze in order to connect between context variable and it's view, you need to create Helper for the template, and define a function that returns the view value.

Angular 2 uses the context of the Component class, and the definition of these view helpers is inside a regular variable.

> Every variable you will define in `this` context in Angular 2, will be available to use in your view template.
