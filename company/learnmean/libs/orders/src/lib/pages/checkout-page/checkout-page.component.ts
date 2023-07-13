import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsersService } from "@learnmean/users";
import { OrderItem } from "../../models/order-item";
import { Order } from "../../models/order";
import { CartService } from "../../services/cart.service";
import { Cart } from "../../models/cart";
import { OrdersService } from "../../services/order.service";
import { ORDER_STATUS } from "../../orders.constant";
import { Subject, take, takeUntil } from "rxjs";
import { StripeService } from "ngx-stripe";
@Component({
  selector: "orders-checkout-page",
  templateUrl: "./checkout-page.component.html",
  styles: [],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  checkoutFormGroup: FormGroup;
  isSubmitted = false;
  orderItems: any[] = [];
  userId: string;
  countries = [];
  unsubscribe$: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private cartService: CartService,
    private orderService: OrdersService,
    private stripeService: StripeService
  ) {}

  ngOnInit(): void {
    this._initCheckoutForm();
    console.log("something");
    this._autoFillUserData();
    this._getCartItems();
    this._getCountries();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
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

  private _autoFillUserData() {
    this.usersService
      .observeCurrentUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        if (user) {
          this.userId = user.id;
          this.checkoutForm.name.setValue(user.name);
          this.checkoutForm.email.setValue(user.email);
          this.checkoutForm.phone.setValue(user.phone);
          this.checkoutForm.city.setValue(user.city);
          this.checkoutForm.country.setValue(user.country);
          this.checkoutForm.zip.setValue(user.zip);
          this.checkoutForm.apartment.setValue(user.apartment);
          this.checkoutForm.street.setValue(user.street);
        }
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

    this.orderService.cacheOrderData(order);
    this.orderService
      .createCheckoutSession(this.orderItems)
      .subscribe((error) => {
        if (error) {
          console.log("error in redirect to payment");
        }
      });
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
