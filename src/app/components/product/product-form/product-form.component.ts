import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { IProduct } from "../../../interfaces";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],

})
export class ProductFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() form!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  callSave() {
    let item: IProduct = {
      name: this.form.controls["name"].value,
      description: this.form.controls["description"].value,
      price: this.form.controls["price"].value,
      quantity: this.form.controls["quantity"].value,
      category: this.form.controls["category"].value,
    }
    if (this.form.controls["id"].value) {
      item.id = this.form.controls["id"].value;
    }
    if (item.id) {
      this.callUpdateMethod.emit(item);
    } else {
      this.callSaveMethod.emit(item);
    }
  }
}
