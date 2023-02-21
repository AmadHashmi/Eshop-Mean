import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { CartService } from "../../services/cart.service";
import { OrdersService } from "../../services/order.service";

@Component({
  selector: "orders-order-summary",
  templateUrl: "./order-summary.component.html",
  styles: [],
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
  totalPrice: number;
  endSubs$: Subject<any> = new Subject();
  isCheckout = false;
  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrdersService
  ) {
    this.router.url.includes("checkout") ? (this.isCheckout = true) : false;
  }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  private _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items?.map((item) => {
          this.orderService
            .getProduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            });
        });
      }
    });
  }

  navigateToCheckout() {
    this.router.navigate(["/checkout"]);
  }
}
