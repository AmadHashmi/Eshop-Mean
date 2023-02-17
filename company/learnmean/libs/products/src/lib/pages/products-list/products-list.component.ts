import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
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
  isCategoryPage: boolean;
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params["categoryid"]
        ? this._getProducts([params["categoryid"]])
        : this._getProducts();
      params["categoryid"]
        ? (this.isCategoryPage = true)
        : (this.isCategoryPage = false);
    });
    //this._getProducts();

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
