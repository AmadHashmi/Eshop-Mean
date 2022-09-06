import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  CategoriesService,
  Product,
  ProductsService,
} from "@learnmean/products";
import { MessageService } from "primeng/api";

@Component({
  selector: "admin-product-form",
  templateUrl: "./product-form.component.html",
  styles: [],
})
export class ProductFormComponent implements OnInit {
  editMode = false;
  isSubmitted = false;
  currentProductId: string;
  form: FormGroup;
  categories = [];
  imageDisplay: string | ArrayBuffer;
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      brand: ["", Validators.required],
      price: ["", Validators.required],
      category: ["", Validators.required],
      countInStock: ["", Validators.required],
      description: ["", Validators.required],
      richDescription: [""],
      image: ["", Validators.required],
      isFeatured: [false],
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category["id"]);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
          console.log(product.image);
        });
      }
    });
  }

  get productForm() {
    return this.form.controls;
  }

  onCancel() {
    this.location.back();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });

    //console.log(productFormData);
    if (this.editMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (response) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Product Created Successfully!",
        });

        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Failed",
          detail: "Product is not created!",
        });
      }
    );
  }

  private _updateProduct(productData: FormData) {
    this.productsService
      .updateProduct(productData, this.currentProductId)
      .subscribe(
        () => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Product Updated Successfully!",
          });

          setTimeout(() => {
            this.router.navigate(["/products"]);
          }, 2000);
        },
        () => {
          this.messageService.add({
            severity: "error",
            summary: "Failed",
            detail: "Product is not updated!",
          });
        }
      );
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get("image").updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
}
