import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/models/post';
import { PostsService } from 'src/app/shared/services/posts.sevices';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.getAllModelsEquipaments();
  }

  getAllModelsEquipaments(): void {
    this.postsService.getAllPosts()
      .subscribe((response: any) => {
        this.posts = response;
        console.log(this.posts);
        
      });
  }
}
