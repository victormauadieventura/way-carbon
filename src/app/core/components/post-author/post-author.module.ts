import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { PipeModule } from "src/app/shared/pipes/pipe.module";
import { PostAuthorComponent } from "./post-author.component";

@NgModule({
  imports: [
    BrowserModule,
    PipeModule,
  ],
  declarations: [
    PostAuthorComponent,
  ],
  exports: [
    PostAuthorComponent,
  ],
})
export class PostAuthorModule { }
