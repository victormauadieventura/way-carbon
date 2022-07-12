import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreRegistrationsComponent } from './core-posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsService } from 'src/app/shared/services/posts.sevices';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostsRoutingModule,
  ],
	declarations: [
    CoreRegistrationsComponent,
  ],
  exports: [
    CoreRegistrationsComponent,
  ],
  providers: [
    PostsService,
  ],
  entryComponents: [
  ],
})
export class PostsModule {}
