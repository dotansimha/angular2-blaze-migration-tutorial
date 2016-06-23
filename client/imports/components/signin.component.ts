import {Component} from "@angular/core";
import {MeteorComponent} from "angular2-meteor/build/index";
import {Router} from "@angular/router-deprecated";

class SigninModel {
  constructor(public email : string, public password : string) {

  }
}

@Component({
  directives: [],
  templateUrl: '/client/imports/components/signin.ng2.html'
})
export class SigninComponent extends MeteorComponent {
  private model : SigninModel;
  private errors : Array<string> = [];

  constructor(private router : Router) {
    super();

    this.model = new SigninModel('', '');
  }

  resetErrors() {
    this.errors = [];
  }

  join() {
    this.resetErrors();

    Meteor.loginWithPassword(this.model.email, this.model.password, (err) => {
      if (err) {
        this.errors.push(err.reason);

        return;
      }

      this.router.root.navigate(['Home']);
    });
  }
}