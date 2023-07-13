import { Component, OnInit } from "@angular/core";
import { OrdersService } from "../../services/order.service";
import { Order } from "../../models/order";
import { CartService } from "../../services/cart.service";

@Component({
  selector: "thank-you-page",
  templateUrl: "./thank-you.component.html",
  styles: [],
})
export class ThankYouComponent implements OnInit {
  constructor(
    private orderService: OrdersService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const orderData = this.orderService.getCachedOrderData();
    this.orderService.createOrder(orderData).subscribe(() => {
      this.cartService.emptyCart();
      this.orderService.removeCachedOrderData();
    });
  }
}
