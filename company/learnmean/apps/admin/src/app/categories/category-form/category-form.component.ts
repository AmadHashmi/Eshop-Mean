import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoriesService, Category } from "@learnmean/products";
import { MessageService } from "primeng/api";
import { timer } from "rxjs";

@Component({
  selector: "admin-category-form",
  templateUrl: "./category-form.component.html",
  styles: [],
})
export class CategoryFormComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      icon: ["", Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
    };

    this.categoriesService.createCategory(category).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Category Created Successfully!",
        });

        setTimeout(() => {
          console.log("going back");
          this.location.back();
        }, 2000);
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: "error",
          summary: "Failed",
          detail: "Category is not created!",
        });
      }
    );
  }

  get categoryForm() {
    return this.form.controls;
  }
}
