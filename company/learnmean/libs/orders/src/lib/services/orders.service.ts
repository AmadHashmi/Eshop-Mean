import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Order } from "../models/order";
import { environment } from "@env/environment";
@Injectable({
  providedIn: "root",
})
export class OrdersService {
  apiUrlOrders = `${environment.apiURL}orders`;
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrlOrders);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrlOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrlOrders, order);
  }
  updateOrder(
    orderStatus: { status: string },
    orderId: string
  ): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrlOrders}/${orderId}`, orderStatus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlOrders}/${orderId}`);
  }

  getOrdersCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlOrders}/get/count`)
      .pipe(map((objectValue: any) => objectValue.orderCount));
  }

  getTotalSales(): Observable<number> {
    return this.http
      .get<number>(`${this.apiUrlOrders}/get/totalsales`)
      .pipe(map((objectValue: any) => objectValue.totalSales));
  }
}
