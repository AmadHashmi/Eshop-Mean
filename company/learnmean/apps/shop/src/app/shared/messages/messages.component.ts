import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { CartService } from "@learnmean/orders";

@Component({
  selector: "shop-messages",
  templateUrl: "./messages.component.html",
  styles: [],
})
export class MessagesComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Cart Updated!",
      });
    });
  }
}
