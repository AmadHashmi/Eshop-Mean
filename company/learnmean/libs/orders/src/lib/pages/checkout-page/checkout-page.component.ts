import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsersService } from "@learnmean/users";
import { OrderItem } from "../../models/order-item";
import * as countriesLib from "i18n-iso-countries";
import { Order } from "../../models/order";

@Component({
  selector: "orders-checkout-page",
  templateUrl: "./checkout-page.component.html",
  styles: [],
})
export class CheckoutPageComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: OrderItem[] = [];
  userId: string;
  countries = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCountries();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      phone: ["", Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      zip: ["", Validators.required],
      apartment: ["", Validators.required],
      street: ["", Validators.required],
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }
  backToCart() {
    this.router.navigate(["/cart"]);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: this.checkoutForm.status.value,
      totalPrice: this.checkoutForm.totalPrice.value,
      //user: this.userId,
      dateOrdered: this.checkoutForm.dateOrdered.value,
    };
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
