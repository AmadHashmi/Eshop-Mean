import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesService, Category } from "@learnmean/products";
import { MessageService } from "primeng/api";

@Component({
  selector: "admin-category-form",
  templateUrl: "./category-form.component.html",
  styles: [],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId: string;
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      icon: ["", Validators.required],
      color: ["#fff"],
    });

    this._checkEditMode();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value,
    };

    if (this.editMode) {
      this._updateCategory(category);
    } else {
      this._addCategory(category);
    }
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      (response) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Category Created Successfully!",
        });

        setTimeout(() => {
          this.location.back();
        }, 2000);
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Failed",
          detail: "Category is not created!",
        });
      }
    );
  }

  private _updateCategory(category) {
    this.categoriesService.updateCategory(category).subscribe(
      (category) => {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Category Updated Successfully!",
        });

        setTimeout(() => {
          this.router.navigate(["/categories"]);
        }, 2000);
      },
      (error) => {
        this.messageService.add({
          severity: "error",
          summary: "Failed",
          detail: "Category is not updated!",
        });
      }
    );
  }

  get categoryForm() {
    return this.form.controls;
  }

  private _checkEditMode() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe((category) => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        });
      }
    });
  }

  onCancel() {
    this.location.back();
  }
}
