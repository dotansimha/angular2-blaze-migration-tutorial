import {Component} from "@angular/core";
import {MeteorComponent} from "angular2-meteor/build/index";
import {Accounts} from "meteor/accounts-base";
import {Router} from "@angular/router-deprecated";

class JoinModel {
  constructor(public email : string, public password : string, public passwordVerify : string) {

  }
}

@Component({
  directives: [],
  templateUrl: '/client/imports/components/join.html'
})
export class JoinComponent extends MeteorComponent {
  private model : JoinModel;
  private errors : Array<string> = [];

  constructor(private router : Router) {
    super();

    this.model = new JoinModel('', '', '');
  }

  resetErrors() {
    this.errors = [];
  }

  join() {
    this.resetErrors();

    if (this.model.password !== this.model.passwordVerify) {
      this.errors.push("Passwords does not match!");

      return;
    }

    Accounts.createUser({
      email: this.model.email,
      password: this.model.email
    }, (err) => {
      if (err) {
        this.errors.push(err.reason);

        return;
      }

      this.router.root.navigate(['Home']);
    });
  }
}