import { Component, inject, ViewChild } from "@angular/core";
import { CategoryFormComponent } from "../../components/category/category-form/category-form.component";
import { CategoryListComponent } from "../../components/category/category-list/category-list.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ICategory } from "../../interfaces";
import { CategoryService } from "../../services/category.service";
import { Form, FormBuilder } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { ModalService } from "../../services/modal.service";

@Component({
  selector: "app-category",
    templateUrl: "./category.component.html",
    styleUrls: ["./category.component.scss"],
    standalone: true,
    imports: [
      CategoryFormComponent,
      CategoryListComponent,
      PaginationComponent,
      ModalComponent
    ]
})
export class CategoryComponent {
  public categorylist: ICategory[] = [];
  public categoryService: CategoryService = inject(CategoryService);
  public fb: FormBuilder = inject(FormBuilder);
  public categoryForm = this.fb.group({
    id: [''],
    name: [''],
    description: ['']
  });
  public modalService: ModalService = inject(ModalService);
  @ViewChild('editCategoryModal') public editCategoryModal: any;

  public authService = inject(AuthService);
  public areActionsAvailable: boolean = false;
  public route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.authService.getUserAuthorities();
    this.route.data.subscribe(data => {
      this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
    });
  }

  constructor() {
    this.categoryService.getAll();
  }

  saveCategory(item: ICategory) {
    this.categoryService.save(item);
  }

  updateCategory(item: ICategory) {
    this.categoryService.update(item);
    this.modalService.closeAll();
    this.categoryForm.reset();
  }

  deleteCategory(item: ICategory) {
    this.categoryService.delete(item);
  }

  openEditCategoryModal(category: ICategory) {
    console.log('openEditCategoryModal', category);
    this.categoryForm.patchValue({
      id: JSON.stringify(category.id),
      name: category.name,
      description: category.description
    });
    this.modalService.displayModal('lg', this.editCategoryModal);
  }

}