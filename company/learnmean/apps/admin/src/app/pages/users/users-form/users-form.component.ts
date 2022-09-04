import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { User, UsersService } from "@learnmean/users";
import * as countriesLib from "i18n-iso-countries";
import { MessageService } from "primeng/api";
declare const require;
@Component({
  selector: "admin-users-form",
  templateUrl: "./users-form.component.html",
  styles: [],
})
export class UsersFormComponent implements OnInit {
  editMode = false;
  form: FormGroup;
  currentUserId: string;
  isSubmitted = false;
  countries = [];
  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCountries();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      phone: ["", Validators.required],
      isAdmin: [false],
      street: [""],
      apartment: [""],
      zip: [""],
      city: [""],
      country: [""],
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).subscribe((user) => {
          this.userForm.name.setValue(user.name);
          this.userForm.email.setValue(user.email);
          this.userForm.phone.setValue(user.phone);
          this.userForm.isAdmin.setValue(user.isAdmin);
          this.userForm.street.setValue(user.street);
          this.userForm.apartment.setValue(user.apartment);
          this.userForm.zip.setValue(user.zip);
          this.userForm.city.setValue(user.city);
          this.userForm.country.setValue(user.country);
          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        });
      }
    });
  }

  private _getCountries() {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(
      countriesLib.getNames("en", { select: "official" })
    ).map((entry) => {
      return {
        id: entry[0],
        name: entry[1],
      };
    });
    console.log(this.countries);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      id: this.currentUserId,
      name: this.userForm.name.value,
      email: this.userForm.email.value,
      password: this.userForm.password.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
    };

    if (this.editMode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }
  onCancel() {
    this.location.back();
  }

  get userForm() {
    return this.form.controls;
  }

  private _addUser(user: User) {
    this.usersService.createUser(user).subscribe(
      (response) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "User Created Successfully!",
        });

        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Failed",
          detail: "User is not created!",
        });
      }
    );
  }

  private _updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(
      (category) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "User Updated Successfully!",
        });

        setTimeout(() => {
          this.router.navigate(["/users"]);
        }, 2000);
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Failed",
          detail: "User is not updated!",
        });
      }
    );
  }
}
