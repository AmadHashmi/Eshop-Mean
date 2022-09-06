import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGaurd } from "@learnmean/users";
import { CategoriesListComponent } from "./pages/categories/categories-list/categories-list.component";
import { CategoryFormComponent } from "./pages/categories/category-form/category-form.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { OrderDetailComponent } from "./pages/orders/order-detail/order-detail.component";
import { OrdersListComponent } from "./pages/orders/orders-list/orders-list.component";
import { ProductFormComponent } from "./pages/products/product-form/product-form.component";
import { ProductsListComponent } from "./pages/products/products-list/products-list.component";
import { UsersFormComponent } from "./pages/users/users-form/users-form.component";
import { UsersListComponent } from "./pages/users/users-list/users-list.component";
import { ShellComponent } from "./shared/shell/shell.component";
const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    canActivate: [AuthGaurd],
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "categories",
        component: CategoriesListComponent,
      },
      {
        path: "categories/form",
        component: CategoryFormComponent,
      },
      {
        path: "categories/form/:id",
        component: CategoryFormComponent,
      },
      {
        path: "products",
        component: ProductsListComponent,
      },
      {
        path: "products/form",
        component: ProductFormComponent,
      },
      {
        path: "products/form/:id",
        component: ProductFormComponent,
      },
      {
        path: "users",
        component: UsersListComponent,
      },
      {
        path: "users/form",
        component: UsersFormComponent,
      },
      {
        path: "users/form/:id",
        component: UsersFormComponent,
      },
      { path: "orders", component: OrdersListComponent },
      { path: "orders/:id", component: OrderDetailComponent },
    ],
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: "enabledBlocking" }),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {}
