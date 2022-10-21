import { Component, OnInit } from "@angular/core";
import { Category } from "../../models/categories";
import { Product } from "../../models/products";
import { CategoriesService } from "../../services/categories.service";
import { ProductsService } from "../../services/products.service";

@Component({
  selector: "products-list",
  templateUrl: "./products-list.component.html",
  styles: [],
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this._getProducts();
    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productsService
      .getProducts(categoriesFilter)
      .subscribe((resProducts) => {
        this.products = resProducts;
      });
  }
  private _getCategories() {
    this.categoriesService.getCategories().subscribe((resCategories) => {
      this.categories = resCategories;
    });
  }

  categoryFilter() {
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => category.id);
    this._getProducts(selectedCategories);
  }
}
