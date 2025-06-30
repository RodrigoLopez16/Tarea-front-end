import { Component, inject, ViewChild } from "@angular/core";
import { ProductFormComponent } from "../../components/product/product-form/product-form.component";
import { ProductListComponent } from "../../components/product/product-list/product-list.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { IProduct } from "../../interfaces";
import { ProductService } from "../../services/product.service";
import { FormBuilder, Form, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { ModalService } from "../../services/modal.service";

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"],
    standalone: true,
    imports: [
        ProductFormComponent,
        ProductListComponent,
        PaginationComponent,
        ModalComponent
    ]
})
export class ProductComponent {
    public productList: IProduct[] = [];
    public productService: ProductService = inject(ProductService);
    public fb: FormBuilder = inject(FormBuilder);
    public productForm = this.fb.group({
        id: [''],
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        quantity: ['', Validators.required],
        category: [null]
    });
    public modalService: ModalService = inject(ModalService);
    @ViewChild('editProductModal') public editProductModal: any;

    public authService: AuthService = inject(AuthService);
    public areActionsAvailable: boolean = false;
    public route: ActivatedRoute = inject(ActivatedRoute);

    ngOnInit(): void {
        this.authService.getUserAuthorities();
        this.route.data.subscribe(data => {
            this.areActionsAvailable = this.authService.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
        });
    }

    constructor() {
        this.productService.getAll();
    }

    saveProduct(item: IProduct) {
        this.productService.save(item);
    }

    updateProduct(item: IProduct) {
        this.productService.update(item);
        this.modalService.closeAll();
        this.productForm.reset();
    }

    deleteProduct(item: IProduct) {
        this.productService.delete(item);
    }

    openEditProductModal(product: IProduct) {
        console.log('openEditProductModal', product);
        this.productForm.patchValue({
            id: JSON.stringify(product.id),
            name: product.name,
            description: product.description,
            price: JSON.stringify(product.price),
            quantity: JSON.stringify(product.quantity),
            category: product.category as any
        });
        this.modalService.displayModal('lg', this.editProductModal);
    }
}
