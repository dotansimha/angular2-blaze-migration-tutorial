So what's next? there are several this we removed or did not migrate at this tutorial - because we want to keep in simple and focus on the important difference between Angular 2 and Blaze.

### i18n

In the Todos, there is support for i18n using Meteor package that provides helpers for Blaze Templates so we was not able to use it

Angular 2 still does not provide builtin solution for i18n, but you can use external packages such as [ng2-translate](https://github.com/ocombe/ng2-translate).

### Unit Tests

If you wish to test you Components as standalone - you can use the recommendation of Angular 2 for unit tests, which [can be found here](https://angular.io/docs/ts/latest/guide/testing.html).

If you with to test you Angular 2 code with your Meteor code, you can use any testing framework for Meteor, we recommend Mocha using `practicalmeteor:mocha` package, if you wish to see an example for Angular 2 Component tests, you can look at [Angular2-Meteor tests files](https://github.com/Urigo/angular2-meteor/tree/master/tests/client/unit).

### Animations

In the Todos app, they used `momentum` package to create Animations such as fade when loading the main page.

The solution for Angular 2 animations is built-in support for animations, you can [read about it here](https://angular.io/docs/ts/latest/guide/animations.html).
