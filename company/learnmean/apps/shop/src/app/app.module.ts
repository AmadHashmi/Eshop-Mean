import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { AccordionModule } from "primeng/accordion";
import { NavComponent } from "./shared/nav/nav.component";
import { ProductsModule } from "@learnmean/products";
import { UiModule } from "@learnmean/ui";
import { OrdersModule } from "@learnmean/orders";
import { MessagesComponent } from "./shared/messages/messages.component";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { JwtInterceptor, UsersModule } from "@learnmean/users";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NgxStripeModule } from "ngx-stripe";
const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MessagesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AccordionModule,
    ProductsModule,
    UiModule,
    HttpClientModule,
    OrdersModule,
    ToastModule,
    UsersModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    NgxStripeModule.forRoot(
      "pk_test_51NNMunKZjdcGQSabHShSaFwjofBS6jijW4SmlIn9c7EdhBsoA2tQkOSsGpckXZXhJD5cyJ8Bf2px3SciUWAamy3n00i3Xze28g"
    ),
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [MessagesComponent],
})
export class AppModule {}
