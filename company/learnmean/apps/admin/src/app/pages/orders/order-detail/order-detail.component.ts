import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Order, OrdersService } from "@learnmean/orders";
import { MessageService } from "primeng/api";
import { ORDER_STATUS } from "../order-constants";

@Component({
  selector: "admin-order-detail",
  templateUrl: "./order-detail.component.html",
  styles: [],
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus;
  // endSubs$: Subject<any> = new Subject();
  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }
  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
    console.log(Object.keys(ORDER_STATUS));
  }

  // ngOnDestroy(): void {
  //   this.endSubs$.next(null);
  //   this.endSubs$.complete();
  // }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.ordersService.getOrder(params.id).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  onStatusChange(event) {
    this.ordersService
      .updateOrder({ status: event.value }, this.order.id)
      .subscribe(
        (order) => {
          console.log(order);
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Order is updated!",
          });
        },
        () => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Order is not updated!",
          });
        }
      );
  }
}
