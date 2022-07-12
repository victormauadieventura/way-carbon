import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post.sevices';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post = {};

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.getAllPosts(+id);
    }
  }

  getAllPosts(id: number): void {
    this.postService.getPosts(id)
      .subscribe((response: any) => {
        this.post = response;
        console.log(this.post);
      });
  }
}
