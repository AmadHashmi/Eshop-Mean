import { Component, OnInit } from "@angular/core";
import { UsersService } from "@learnmean/users";

@Component({
  selector: "shop-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "shop";
  constructor(private userService: UsersService) {}
  ngOnInit(): void {
    this.userService.initAppSession();
  }
}
