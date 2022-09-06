import { Component, OnInit } from "@angular/core";
import { AuthService } from "@learnmean/users";

@Component({
  selector: "admin-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log("side bar");
  }

  userLogout() {
    this.authService.logout();
  }
}
