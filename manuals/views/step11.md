[{]: <region> (header)
# Step 11: Migrating Authentication Templates
[}]: #
[{]: <region> (body)
So now we will take care of the authentication Blaze Templates, such as Join and Signup.

We already created a stub Angular 2 Components for them - we just need to implement them now.

This Todos project uses AccountTemplates package, which has a default style templates for signin and join pages - we do not want to use those and we want to implement it with Angular 2.

The style and template defined in `imports/ui/accounts/accounts-templates.html` and we will copy the thing we need and create a new Angular 2 template file that looks the same.

[{]: <helper> (diff_step 11.1)
#### Step 11.1: Take the layout of the join form

##### Added client/imports/components/join.ng2.html
```diff
@@ -0,0 +1,24 @@
+┊  ┊ 1┊<div class="page auth">
+┊  ┊ 2┊    <nav>
+┊  ┊ 3┊        <div class="nav-group">
+┊  ┊ 4┊            <a href="#" class="js-menu nav-item">
+┊  ┊ 5┊                <span class="icon-list-unordered"></span>
+┊  ┊ 6┊            </a>
+┊  ┊ 7┊        </div>
+┊  ┊ 8┊    </nav>
+┊  ┊ 9┊
+┊  ┊10┊    <div class="content-scrollable">
+┊  ┊11┊        <div class="wrapper-auth">
+┊  ┊12┊            <div class="at-form">
+┊  ┊13┊                <h1 class="title-auth">Join</h1>
+┊  ┊14┊                <p class="subtitle-auth">Signing in allows you to have private lists</p>
+┊  ┊15┊                <div class="at-pwd-form">
+┊  ┊16┊                    <form role="form" id="at-pwd-form">
+┊  ┊17┊
+┊  ┊18┊                    </form>
+┊  ┊19┊                </div>
+┊  ┊20┊            </div>
+┊  ┊21┊
+┊  ┊22┊        </div>
+┊  ┊23┊    </div>
+┊  ┊24┊</div>🚫↵
```
[}]: # 

So this is the basic layout without the actual form fields, let's use it:

[{]: <helper> (diff_step 11.2)
#### Step 11.2: Use the new template

##### Changed client/imports/components/join.component.ts
```diff
@@ -1,7 +1,7 @@
 ┊1┊1┊import {Component} from "@angular/core";
 ┊2┊2┊
 ┊3┊3┊@Component({
-┊4┊ ┊  template: 'Join!'
+┊ ┊4┊  templateUrl: '/client/imports/components/join.html'
 ┊5┊5┊})
 ┊6┊6┊export class JoinComponent {
 ┊7┊7┊}🚫↵
```
[}]: # 

Now let's add the actual form:

[{]: <helper> (diff_step 11.3)
#### Step 11.3: Added the join form HTML

##### Changed client/imports/components/join.ng2.html
```diff
@@ -6,19 +6,31 @@
 ┊ 6┊ 6┊            </a>
 ┊ 7┊ 7┊        </div>
 ┊ 8┊ 8┊    </nav>
-┊ 9┊  ┊
 ┊10┊ 9┊    <div class="content-scrollable">
 ┊11┊10┊        <div class="wrapper-auth">
 ┊12┊11┊            <div class="at-form">
 ┊13┊12┊                <h1 class="title-auth">Join</h1>
 ┊14┊13┊                <p class="subtitle-auth">Signing in allows you to have private lists</p>
+┊  ┊14┊                <div class="list-errors">
+┊  ┊15┊                    <div *ngFor="let errorText of errors" class="list-item">{{errorText}}</div>
+┊  ┊16┊                </div>
 ┊15┊17┊                <div class="at-pwd-form">
-┊16┊  ┊                    <form role="form" id="at-pwd-form">
-┊17┊  ┊
+┊  ┊18┊                    <form id="at-pwd-form" (ngSubmit)="join()" #joinForm="ngForm">
+┊  ┊19┊                        <div class="input">
+┊  ┊20┊                            <input [(ngModel)]="model.email" required type="text" id="email" name="email" placeholder="Email" class="form-control" autocapitalize="none" autocorrect="off">
+┊  ┊21┊                        </div>
+┊  ┊22┊                        <div class="input">
+┊  ┊23┊                            <input [(ngModel)]="model.password" required type="password" id="password" name="password" class="form-control" placeholder="Password" autocapitalize="none" autocorrect="off">
+┊  ┊24┊                        </div>
+┊  ┊25┊                        <div class="input">
+┊  ┊26┊                            <input [(ngModel)]="model.passwordVerify" required type="password" id="password_verify" class="form-control" name="password_verify" placeholder="Password (Again)" autocapitalize="none" autocorrect="off">
+┊  ┊27┊                        </div>
+┊  ┊28┊                        <button type="submit" class="btn-primary" [disabled]="!joinForm.form.valid">
+┊  ┊29┊                            REGISTER
+┊  ┊30┊                        </button>
 ┊18┊31┊                    </form>
 ┊19┊32┊                </div>
 ┊20┊33┊            </div>
-┊21┊  ┊
 ┊22┊34┊        </div>
 ┊23┊35┊    </div>
 ┊24┊36┊</div>🚫↵
```
[}]: # 

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

[{]: <helper> (diff_step 11.4)
#### Step 11.4: Added the join form logic

##### Changed client/imports/components/join.component.ts
```diff
@@ -1,7 +1,49 @@
-┊ 1┊  ┊import {Component} from "@angular/core";
+┊  ┊ 1┊import {Component, NgZone} from "@angular/core";
+┊  ┊ 2┊import {Router} from "@angular/router";
+┊  ┊ 3┊
+┊  ┊ 4┊class JoinModel {
+┊  ┊ 5┊  constructor(public email : string, public password : string, public passwordVerify : string) {
+┊  ┊ 6┊
+┊  ┊ 7┊  }
+┊  ┊ 8┊}
 ┊ 2┊ 9┊
 ┊ 3┊10┊@Component({
 ┊ 4┊11┊  templateUrl: '/client/imports/components/join.html'
 ┊ 5┊12┊})
 ┊ 6┊13┊export class JoinComponent {
+┊  ┊14┊  private model : JoinModel;
+┊  ┊15┊  private errors : Array<string> = [];
+┊  ┊16┊
+┊  ┊17┊  constructor(private router : Router, private zone: NgZone) {
+┊  ┊18┊    this.model = new JoinModel('', '', '');
+┊  ┊19┊  }
+┊  ┊20┊
+┊  ┊21┊  resetErrors() {
+┊  ┊22┊    this.errors = [];
+┊  ┊23┊  }
+┊  ┊24┊
+┊  ┊25┊  join() {
+┊  ┊26┊    this.resetErrors();
+┊  ┊27┊
+┊  ┊28┊    if (this.model.password !== this.model.passwordVerify) {
+┊  ┊29┊      this.errors.push("Passwords does not match!");
+┊  ┊30┊
+┊  ┊31┊      return;
+┊  ┊32┊    }
+┊  ┊33┊
+┊  ┊34┊    Accounts.createUser({
+┊  ┊35┊      email: this.model.email,
+┊  ┊36┊      password: this.model.password
+┊  ┊37┊    }, (err) => {
+┊  ┊38┊      if (err) {
+┊  ┊39┊        this.zone.run(() => {
+┊  ┊40┊          this.errors.push(err.reason);
+┊  ┊41┊        });
+┊  ┊42┊
+┊  ┊43┊        return;
+┊  ┊44┊      }
+┊  ┊45┊
+┊  ┊46┊      this.router.navigate(['/']);
+┊  ┊47┊    });
+┊  ┊48┊  }
 ┊ 7┊49┊}🚫↵
```
[}]: # 

And we also need to add an import for Angular 2 Forms Module, so let's do it:

[{]: <helper> (diff_step 11.5)
#### Step 11.5: Add import to angular forms module

##### Changed client/imports/app.module.ts
```diff
@@ -7,6 +7,7 @@
 ┊ 7┊ 7┊import {Angular2BlazeTemplateModule} from "angular2-blaze-template";
 ┊ 8┊ 8┊import {JoinComponent} from "./components/join.component";
 ┊ 9┊ 9┊import {SigninComponent} from "./components/signin.component";
+┊  ┊10┊import {FormsModule} from "@angular/forms";
 ┊10┊11┊
 ┊11┊12┊@NgModule({
 ┊12┊13┊    // Components, Pipes, Directive
```
```diff
@@ -27,7 +28,8 @@
 ┊27┊28┊    imports: [
 ┊28┊29┊        BrowserModule,
 ┊29┊30┊        routing,
-┊30┊  ┊        Angular2BlazeTemplateModule
+┊  ┊31┊        Angular2BlazeTemplateModule,
+┊  ┊32┊        FormsModule
 ┊31┊33┊    ],
 ┊32┊34┊    // Main Component
 ┊33┊35┊    bootstrap: [MainComponent]
```
[}]: # 

This Todo base project uses packages that intent to help developing Blaze Template with Meteor Accounts, and we no longer need it, and it is also "takes control" of sign-up, so we need to remove it.

So let's remove those packages, by running:

    meteor remove useraccounts:unstyled useraccounts:flow-routing softwarerero:accounts-t9n

And we also perform some cleanup and remove some files that uses this packages - you can see those modifications in commit #7.6 (or [here](https://github.com/dotansimha/angular2-blaze-migration-tutorial/commit/6c1bab196ba03c8f5d2e933644411733acd62272))

Great! now we need to make sure that there is an indication for the user that he's logged in, so let's go back to `MainContainerComponent` and and add `currentUser` field:

[{]: <helper> (diff_step 11.7)
#### Step 11.7: Added current user to the main page

##### Changed client/imports/main.component.ts
```diff
@@ -16,6 +16,7 @@
 ┊16┊16┊  private menuOpen : boolean = false;
 ┊17┊17┊  private userMenuOpen : boolean = false;
 ┊18┊18┊  private lists: Observable<any>;
+┊  ┊19┊  private currentUser : Meteor.User;
 ┊19┊20┊
 ┊20┊21┊  constructor(private router: Router) {
 ┊21┊22┊    this.isCordova = Meteor.isCordova;
```
```diff
@@ -32,6 +33,8 @@
 ┊32┊33┊          {userId: Meteor.userId()},
 ┊33┊34┊        ]
 ┊34┊35┊      }).zone();
+┊  ┊36┊
+┊  ┊37┊      this.currentUser = Meteor.user();
 ┊35┊38┊    });
 ┊36┊39┊  }
```
[}]: # 

> We put that code inside `autorun` because we want it to update when the user login or logout.

Now we should be able to see the user's name if the main page - the only missing thing is to fix and add toggle for the user menu:

[{]: <helper> (diff_step 11.8)
#### Step 11.8: Fix the user menu toggle

##### Changed client/imports/main-component.ng2.html
```diff
@@ -1,7 +1,7 @@
 ┊1┊1┊<div id="container" [ngClass]="{'menu-open': menuOpen, 'cordova': isCordova}">
 ┊2┊2┊    <section id="menu">
 ┊3┊3┊        <div *ngIf="currentUser" class="btns-group-vertical">
-┊4┊ ┊            <a href="#" class="js-user-menu btn-secondary">
+┊ ┊4┊            <a class="js-user-menu btn-secondary" (click)="userMenuOpen = !userMenuOpen">
 ┊5┊5┊                <span *ngIf="userMenuOpen" class="icon-arrow-up"></span>
 ┊6┊6┊                <span *ngIf="!userMenuOpen" class="icon-arrow-down"></span>
```
[}]: # 

Now, let's do the same for the `SigninComponent` - it's very similar:

[{]: <helper> (diff_step 11.9)
#### Step 11.9: Added the signin view

##### Added client/imports/components/signin.ng2.html
```diff
@@ -0,0 +1,33 @@
+┊  ┊ 1┊<div class="page auth">
+┊  ┊ 2┊    <nav>
+┊  ┊ 3┊        <div class="nav-group">
+┊  ┊ 4┊            <a href="#" class="js-menu nav-item">
+┊  ┊ 5┊                <span class="icon-list-unordered"></span>
+┊  ┊ 6┊            </a>
+┊  ┊ 7┊        </div>
+┊  ┊ 8┊    </nav>
+┊  ┊ 9┊    <div class="content-scrollable">
+┊  ┊10┊        <div class="wrapper-auth">
+┊  ┊11┊            <div class="at-form">
+┊  ┊12┊                <h1 class="title-auth">Signin</h1>
+┊  ┊13┊                <p class="subtitle-auth">Signing in allows you to have private lists</p>
+┊  ┊14┊                <div class="list-errors">
+┊  ┊15┊                    <div *ngFor="let errorText of errors" class="list-item">{{errorText}}</div>
+┊  ┊16┊                </div>
+┊  ┊17┊                <div class="at-pwd-form">
+┊  ┊18┊                    <form id="at-pwd-form" (ngSubmit)="join()" #joinForm="ngForm">
+┊  ┊19┊                        <div class="input">
+┊  ┊20┊                            <input [(ngModel)]="model.email" required type="text" id="email" name="email" placeholder="Email" class="form-control" autocapitalize="none" autocorrect="off">
+┊  ┊21┊                        </div>
+┊  ┊22┊                        <div class="input">
+┊  ┊23┊                            <input [(ngModel)]="model.password" required type="password" id="password" name="password" class="form-control" placeholder="Password" autocapitalize="none" autocorrect="off">
+┊  ┊24┊                        </div>
+┊  ┊25┊                        <button type="submit" class="btn-primary" [disabled]="!joinForm.form.valid">
+┊  ┊26┊                            SIGN IN
+┊  ┊27┊                        </button>
+┊  ┊28┊                    </form>
+┊  ┊29┊                </div>
+┊  ┊30┊            </div>
+┊  ┊31┊        </div>
+┊  ┊32┊    </div>
+┊  ┊33┊</div>🚫↵
```
[}]: # 

And the Component:

[{]: <helper> (diff_step 11.10)
#### Step 11.10: Implemented the signin logic

##### Changed client/imports/components/signin.component.ts
```diff
@@ -1,7 +1,41 @@
-┊ 1┊  ┊import {Component} from "@angular/core";
+┊  ┊ 1┊import {Component, NgZone} from "@angular/core";
+┊  ┊ 2┊import {Router} from "@angular/router";
+┊  ┊ 3┊
+┊  ┊ 4┊class SigninModel {
+┊  ┊ 5┊  constructor(public email : string, public password : string) {
+┊  ┊ 6┊
+┊  ┊ 7┊  }
+┊  ┊ 8┊}
 ┊ 2┊ 9┊
 ┊ 3┊10┊@Component({
-┊ 4┊  ┊  template: 'Signin!'
+┊  ┊11┊  templateUrl: '/client/imports/components/signin.html'
 ┊ 5┊12┊})
 ┊ 6┊13┊export class SigninComponent {
+┊  ┊14┊  private model : SigninModel;
+┊  ┊15┊  private errors : Array<string> = [];
+┊  ┊16┊
+┊  ┊17┊  constructor(private router: Router, private ngZone: NgZone) {
+┊  ┊18┊    this.model = new SigninModel('', '');
+┊  ┊19┊  }
+┊  ┊20┊
+┊  ┊21┊
+┊  ┊22┊  resetErrors() {
+┊  ┊23┊    this.errors = [];
+┊  ┊24┊  }
+┊  ┊25┊
+┊  ┊26┊  join() {
+┊  ┊27┊    this.resetErrors();
+┊  ┊28┊
+┊  ┊29┊    Meteor.loginWithPassword(this.model.email, this.model.password, (err) => {
+┊  ┊30┊      if (err) {
+┊  ┊31┊        this.ngZone.run(() => {
+┊  ┊32┊          this.errors.push(err.reason);
+┊  ┊33┊        });
+┊  ┊34┊
+┊  ┊35┊        return;
+┊  ┊36┊      }
+┊  ┊37┊
+┊  ┊38┊      this.router.navigate(['/']);
+┊  ┊39┊    });
+┊  ┊40┊  }
 ┊ 7┊41┊}🚫↵
```
[}]: # 

That's it! we implemented the join/signin forms with Angular 2 !

[}]: #
[{]: <region> (footer)
[{]: <helper> (nav_step)
| [< Previous Step](step10.md) | [Next Step >](step12.md) |
|:--------------------------------|--------------------------------:|
[}]: #
[}]: #