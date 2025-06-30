import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { ICategory } from "../../../interfaces";
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-category-list",
    templateUrl: "./category-list.component.html",
    styleUrls: ["./category-list.component.scss"],
    standalone: true
})
export class CategoryListComponent {
    @Input() pCategoryList: ICategory[] = [];
    @Output() callUpdateModalMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();
    @Output() callDeleteMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();
    public authservice: AuthService = inject(AuthService);
    public areActionsAvailable: boolean = false;
    public route: ActivatedRoute = inject(ActivatedRoute);
    ngOnInit(): void {
        this.authservice.getUserAuthorities();
        this.route.data.subscribe(data => {
            this.areActionsAvailable = this.authservice.areActionsAvailable(data['authorities'] ? data['authorities'] : []);
        });
    }


}


