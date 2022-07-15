import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/shared/models/author';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post.sevices';
import { Comments } from 'src/app/shared/models/comments';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post = {};
  author: Author = {};
  comments: Comments[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.getPost(+id);
    }
  }

  getPost(id: number): void {
    this.postService.getPost(id)
      .subscribe((response: any) => {
        this.post = response;
        if (this.post.author) {
          this.getAuthor(this.post.author);
        }
        if (this.post.comment) {
          this.getComment(this.post.comment);
        }
      });
  }

  getAuthor(id: number): void {
    this.postService.getAuthor(id)
      .subscribe((response: any) => {
        this.author = response;
      });
  }

  getComment(id: number): void {
    this.postService.getComment(id)
      .subscribe((response: any) => {
        this.comments = response.comments;
      });
  }

  buttonFunction(event: any): void {
    switch (event) {
      case 'voltar':
        this.location.back();
        break;
    }
  }
}
