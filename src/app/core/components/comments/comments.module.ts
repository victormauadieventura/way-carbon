import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { PipeModule } from "src/app/shared/pipes/pipe.module";
import { PostService } from "src/app/shared/services/post.sevices";
import { ButtonDynamicModule } from "../button-dynamic/button-dynamic.module";
import { CommentsComponent } from "./comments.component";

@NgModule({
  imports: [
    BrowserModule,
    PipeModule,
    ButtonDynamicModule,
  ],
  declarations: [
    CommentsComponent,
  ],
  exports: [
    CommentsComponent,
  ],
  providers: [
    PostService,
  ],
})
export class CommentsModule { }
