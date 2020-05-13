import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Subscription } from 'rxjs';

@Component({
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit, OnDestroy {
  checker = true;
  errorMessage = false;
  private authStatusSub: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getErrorListener().subscribe(
      authStatus => {
        this.errorMessage = true;
      }
    );
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }

  toggleChecker() {
    this.checker = false;
    setTimeout(()=>{
      this.checker = true;
    }, 2500);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
