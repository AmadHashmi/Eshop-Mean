import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User, UsersService } from "@learnmean/users";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "admin-users-list",
  templateUrl: "./users-list.component.html",
  styles: [],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  // endSubs$: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }
  // ngOnDestroy(): void {
  //   this.endSubs$.next(null);
  //   this.endSubs$.complete();
  // }
  private _getProducts() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: "Do you want to delete this User?",
      header: "Delete Product",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
          () => {
            this._getProducts();
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "User is deleted!",
            });
          },
          () => {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "User is not deleted!",
            });
          }
        );
      },
    });
  }
  updateUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }
}
