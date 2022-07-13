import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonDynamicComponent } from "./button-dynamic.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    ButtonDynamicComponent,
  ],
  exports: [
    ButtonDynamicComponent,
  ],
})
export class ButtonDynamicModule { }
