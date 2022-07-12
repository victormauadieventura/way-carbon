import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './posts/posts.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
  ],
  exports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [],
  providers: [],
})
export class SharedModule { }
