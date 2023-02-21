import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsersService } from "@learnmean/users";
import { OrderItem } from "../../models/order-item";
import { Order } from "../../models/order";
import { CartService } from "../../services/cart.service";
import { Cart } from "../../models/cart";
import { OrdersService } from "../../services/order.service";
import { ORDER_STATUS } from "../../orders.constant";
@Component({
  selector: "orders-checkout-page",
  templateUrl: "./checkout-page.component.html",
  styles: [],
})
export class CheckoutPageComponent implements OnInit {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: any[] = [];
  userId = "63f4c9d6126a12ee7fd08784";
  countries = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private cartService: CartService,
    private orderService: OrdersService
  ) {}

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
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

  private _getCartItems() {
    const cart: Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
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
      status: +Object.keys(ORDER_STATUS)[0],
      user: this.userId,
      dateOrdered: `${Date.now()}`,
    };

    this.orderService.createOrder(order).subscribe((orders) => {
      //redirect to the thank you page --> payment
      console.log("Success");
      console.log(orders);
    });
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
