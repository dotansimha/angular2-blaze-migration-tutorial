[{]: <region> (header)
# Step 14: Cleanup
[}]: #
[{]: <region> (body)
So now that we are done with the migration, we need to perform some clean-ups and make sure that we remove all the old files.

Let's join all the stylesheets we need under the same directory - `imports/styelsheets/`, now they are in `imports/ui/stylesheets/` (commit #10.1).

> Make sure to also take `imports/ui/components/lists-show.less` !

And we also need to update the imports in the main less file:

[{]: <helper> (diff_step 14.2)
#### Step 14.2: Update the imports path

##### Changed client/main.less
```diff
@@ -1,22 +1,19 @@
-┊ 1┊  ┊@import "{}/imports/ui/stylesheets/reset.less";
+┊  ┊ 1┊@import "{}/imports/stylesheets/reset.less";
 ┊ 2┊ 2┊
 ┊ 3┊ 3┊// Global namespace
-┊ 4┊  ┊@import "{}/imports/ui/stylesheets/base.less";
-┊ 5┊  ┊@import '{}/imports/ui/stylesheets/button.less';
-┊ 6┊  ┊@import '{}/imports/ui/stylesheets/form.less';
-┊ 7┊  ┊@import '{}/imports/ui/stylesheets/icon.less';
-┊ 8┊  ┊@import '{}/imports/ui/stylesheets/layout.less';
-┊ 9┊  ┊@import '{}/imports/ui/stylesheets/link.less';
-┊10┊  ┊@import '{}/imports/ui/stylesheets/menu.less';
-┊11┊  ┊@import '{}/imports/ui/stylesheets/nav.less';
+┊  ┊ 4┊@import "{}/imports/stylesheets/base.less";
+┊  ┊ 5┊@import '{}/imports/stylesheets/button.less';
+┊  ┊ 6┊@import '{}/imports/stylesheets/form.less';
+┊  ┊ 7┊@import '{}/imports/stylesheets/icon.less';
+┊  ┊ 8┊@import '{}/imports/stylesheets/layout.less';
+┊  ┊ 9┊@import '{}/imports/stylesheets/link.less';
+┊  ┊10┊@import '{}/imports/stylesheets/menu.less';
+┊  ┊11┊@import '{}/imports/stylesheets/nav.less';
 ┊12┊12┊
 ┊13┊13┊// Global components
-┊14┊  ┊@import '{}/imports/ui/stylesheets/list-items.less';
-┊15┊  ┊@import '{}/imports/ui/stylesheets/message.less';
-┊16┊  ┊@import '{}/imports/ui/stylesheets/notification.less';
+┊  ┊14┊@import '{}/imports/stylesheets/list-items.less';
+┊  ┊15┊@import '{}/imports/stylesheets/message.less';
+┊  ┊16┊@import '{}/imports/stylesheets/notification.less';
 ┊17┊17┊
-┊18┊  ┊// Individual components
-┊19┊  ┊@import "{}/imports/ui/components/lists-show.less";
-┊20┊  ┊@import "{}/imports/ui/components/loading.less";
-┊21┊  ┊@import "{}/imports/ui/pages/app-not-found.less";
-┊22┊  ┊@import "{}/imports/ui/accounts/accounts-templates.less";
+┊  ┊18┊// Individual compons
+┊  ┊19┊@import "{}/imports/stylesheets/lists-show.less";
```
[}]: # 

Now we can remove all the files we no longer use from `imports/ui/` directory - which are ALL of the files, except `errors.js` which we use, so let's move it to `/imports/` directory first, and them remove `imports/ui/` directory (commit #10.4).

We can also removed all client startup files (`imports/startup/client`), since we no longer use them (in commit #10.3).

And let's update the imports of `errors.js` file:

[{]: <helper> (diff_step 14.5)
#### Step 14.5: Updated imports path for errors helpers

##### Changed client/imports/components/list-item.component.ts
```diff
@@ -4,7 +4,7 @@
 ┊ 4┊ 4┊  updateText,
 ┊ 5┊ 5┊  remove,
 ┊ 6┊ 6┊} from '../../../imports/api/todos/methods';
-┊ 7┊  ┊import {displayError} from '../../../imports/ui/lib/errors';
+┊  ┊ 7┊import {displayError} from '../../../imports/errors';
 ┊ 8┊ 8┊
 ┊ 9┊ 9┊declare let _;
 ┊10┊10┊
```

##### Changed client/imports/components/list-show.component.ts
```diff
@@ -9,7 +9,7 @@
 ┊ 9┊ 9┊  remove,
 ┊10┊10┊  insert,
 ┊11┊11┊} from '../../../imports/api/todos/methods';
-┊12┊  ┊import { displayError } from '../../../imports/ui/lib/errors';
+┊  ┊12┊import { displayError } from '../../../imports/errors';
 ┊13┊13┊import {Observable} from "rxjs";
 ┊14┊14┊
 ┊15┊15┊@Component({
```
[}]: # 

We can also now remove Meteor packages we no longer use that related to Blaze or Router!

So let's do it by running:

    meteor remove blaze-html-templates aldeed:template-extension kadira:flow-router kadira:blaze-layout arillo:flow-router-helpers zimme:active-route

And now we can also use the regular Angular 2 compilers package, so let's remove the old one and use the regular one:

    meteor remove angular2-with-blaze-compilers
    meteor add angular2-compilers less

And the last step, is to remove `.ng2` from the HTML files extension and update it to be `.html`, remember also to update it in the Component `templateUrl` !

We can also remove the import of Blaze Template from the MainComponent:

[{]: <helper> (diff_step 14.6)
#### Step 14.6: Removed old blaze import

##### Changed client/imports/main.component.ts
```diff
@@ -1,4 +1,3 @@
-┊1┊ ┊import '/imports/startup/client';
 ┊2┊1┊import {Component, OnInit} from "@angular/core";
 ┊3┊2┊import {Meteor} from "meteor/meteor";
 ┊4┊3┊import {MeteorObservable} from "meteor-rxjs";
```
[}]: # 

That's it! In the next chapter we will take about the next step of migration from Blaze to Angular 2.

[}]: #
[{]: <region> (footer)
[{]: <helper> (nav_step)
| [< Previous Step](step13.md) | [Next Step >](step15.md) |
|:--------------------------------|--------------------------------:|
[}]: #
[}]: #