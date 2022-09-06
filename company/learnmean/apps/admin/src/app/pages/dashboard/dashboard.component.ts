import { Component, OnInit } from "@angular/core";
import { OrdersService } from "@learnmean/orders";
import { ProductsService } from "@learnmean/products";
import { UsersService } from "@learnmean/users";
import { combineLatest } from "rxjs";

@Component({
  selector: "admin-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  statistics = [];
  // endSubs$: Subject<any> = new Subject();
  constructor(
    private userService: UsersService,
    private productService: ProductsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.ordersService.getOrdersCount(),
      this.productService.getProductsCount(),
      this.userService.getUsersCount(),
      this.ordersService.getTotalSales(),
    ]).subscribe((values) => {
      console.log(values);
      this.statistics = values;
    });
  }

  // ngOnDestroy(): void {
  //   this.endSubs$.next(null);
  //   this.endSubs$.complete();
  // }
}
