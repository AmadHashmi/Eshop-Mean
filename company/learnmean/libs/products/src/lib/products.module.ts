import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ProductsSearchComponent } from "./components/products-search/products-search.component";
import { CategoriesBannerComponent } from "./components/categories-banner/categories-banner.component";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ProductsSearchComponent, CategoriesBannerComponent],
  exports: [ProductsSearchComponent, CategoriesBannerComponent],
})
export class ProductsModule {}
