import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    DropdownDirective
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownDirective
  ]
})
export class SharedModule {}
