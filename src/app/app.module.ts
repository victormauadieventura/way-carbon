import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './pages/shared.module';
import { HeaderComponent } from './core/components/header/header.component';
import { CoreModule } from './shared/services/core.module';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './pages/posts/posts.component';
import { PostService } from './shared/services/post.sevices';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostsComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    PostService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
