import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { LocalStorageService } from "../../services/local-storage.service";

@Component({
  selector: "users-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  authMessage = "Email or Password wrong";
  isSubmitted = false;
  authError = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
    console.log("this is login register");
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) return;
    const loginData = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value,
    };

    this.authService.login(loginData.email, loginData.password).subscribe(
      (user) => {
        this.authError = false;
        this.localStorageService.setToken(user.token);
        this.router.navigate(["/"]);
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = "Error in the server, please try again later!";
        }
        console.log(error);
      }
    );
  }
}
