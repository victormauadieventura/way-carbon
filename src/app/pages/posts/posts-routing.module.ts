import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreRegistrationsComponent } from './core-posts.component';
import { PostsComponent } from './posts.component';

const routes: Routes = [
  {
    path: '',
    component: CoreRegistrationsComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            component: PostsComponent,
          },
        ]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'posts',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule { }
