import { Component, OnInit } from "@angular/core";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "products-search",
  templateUrl: "./products-search.component.html",
  styles: [],
})
export class ProductsSearchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log("this is products search component");
  }
}
