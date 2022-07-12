import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  imports: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PostsComponent
  ],
  providers: [],
})
export class SharedModule { }
