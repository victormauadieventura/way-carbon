import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonDynamicModule } from '../core/components/button-dynamic/button-dynamic.module';
import { CommentsModule } from '../core/components/comments/post-author.module';
import { PostAuthorModule } from '../core/components/post-author/post-author.module';
import { PostService } from '../shared/services/post.sevices';
import { PostComponent } from './posts/post/post.component';

@NgModule({
  imports: [
    PostAuthorModule,
    CommentsModule,
    ButtonDynamicModule,
  ],
  exports: [
    CommonModule,
    BrowserModule,
  ],
  declarations: [
    PostComponent
  ],
  providers: [
    PostService,
  ],
})
export class SharedModule { }
