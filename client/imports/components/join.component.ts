import {Component, NgZone} from "@angular/core";
import {Router} from "@angular/router";
import template from "./join.html";

class JoinModel {
  constructor(public email : string, public password : string, public passwordVerify : string) {

  }
}

@Component({
  template
})
export class JoinComponent {
  private model : JoinModel;
  private errors : Array<string> = [];

  constructor(private router : Router, private zone: NgZone) {
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
      password: this.model.password
    }, (err) => {
      if (err) {
        this.zone.run(() => {
          this.errors.push(err.reason);
        });

        return;
      }

      this.router.navigate(['/']);
    });
  }
}