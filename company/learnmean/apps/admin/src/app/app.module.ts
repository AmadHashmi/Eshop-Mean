import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { ShellComponent } from "./shared/shell/shell.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CategoriesListComponent } from "./pages/categories/categories-list/categories-list.component";

import { CardModule } from "primeng/card";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CategoriesService } from "@learnmean/products";
import { CategoryFormComponent } from "./pages/categories/category-form/category-form.component";
import { InputTextModule } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ColorPickerModule } from "primeng/colorpicker";
import { ProductsListComponent } from "./pages/products/products-list/products-list.component";
import { ProductFormComponent } from "./pages/products/product-form/product-form.component";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputSwitchModule } from "primeng/inputswitch";
import { DropdownModule } from "primeng/dropdown";
import { EditorModule } from "primeng/editor";
import { UsersFormComponent } from "./pages/users/users-form/users-form.component";
import { UsersListComponent } from "./pages/users/users-list/users-list.component";
import { TagModule } from "primeng/tag";
import { InputMaskModule } from "primeng/inputmask";
import { OrdersListComponent } from "./pages/orders/orders-list/orders-list.component";
import { OrderDetailComponent } from "./pages/orders/order-detail/order-detail.component";
import { JwtInterceptor, UsersModule } from "@learnmean/users";
import { AppRoutingModule } from "./app-routing.module";
import { FieldsetModule } from "primeng/fieldset";
const UX_MODULES = [
  CardModule,
  InputTextModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule,
];

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    SidebarComponent,
    DashboardComponent,
    CategoriesListComponent,
    CategoryFormComponent,
    ProductsListComponent,
    ProductFormComponent,
    UsersFormComponent,
    UsersListComponent,
    OrdersListComponent,
    OrderDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UsersModule,
    AppRoutingModule,
    ...UX_MODULES,
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
