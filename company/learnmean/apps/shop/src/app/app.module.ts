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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AccordionModule,
    ProductsModule,
    UiModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
