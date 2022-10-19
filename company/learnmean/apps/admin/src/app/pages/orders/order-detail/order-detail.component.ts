import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Order, OrdersService } from "@learnmean/orders";
import { MessageService } from "primeng/api";
import { Subject, takeUntil } from "rxjs";
import { ORDER_STATUS } from "../orders.constant";

@Component({
  selector: "admin-order-detail",
  templateUrl: "./order-detail.component.html",
  styles: [],
})
export class OrderDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;
  endsubs$: Subject<any> = new Subject();
  constructor(
    private orderService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }
  ngOnDestroy() {
    this.endsubs$.next(null);
    this.endsubs$.complete();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label,
      };
    });
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService
          .getOrder(params.id)
          .pipe(takeUntil(this.endsubs$))
          .subscribe((order) => {
            this.order = order;
            this.selectedStatus = order.status;
          });
      }
    });
  }

  onStatusChange(event) {
    this.orderService
      .updateOrder({ status: event.value }, this.order.id)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
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
