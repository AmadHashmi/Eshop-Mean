import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Order, OrdersService } from "@learnmean/orders";
import { ORDER_STATUS } from "../order-constants";

@Component({
  selector: "admin-orders-list",
  templateUrl: "./orders-list.component.html",
  styles: [],
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  // endSubs$: Subject<any> = new Subject();
  orderStatus = ORDER_STATUS;
  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this._getOrders();
  }
  // ngOnDestroy(): void {
  //   this.endSubs$.next(null);
  //   this.endSubs$.complete();
  // }

  private _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  deleteOrder(orderId) {}
  showDetails(orderId) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }
}
