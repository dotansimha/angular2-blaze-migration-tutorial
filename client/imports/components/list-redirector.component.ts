import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Meteor} from "meteor/meteor";
import {Lists} from "../../../imports/api/lists/lists";

@Component({
    template: 'Loading...'
})
export class ListRedirectorComponent {
    constructor(private router: Router) {
        Meteor.autorun(() => {
            if (Lists.findOne()) {
                router.navigate(['/lists', Lists.findOne()._id]);
            }
        });
    }
}