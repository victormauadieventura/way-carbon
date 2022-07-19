import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/shared/models/post';
import { PostsService } from 'src/app/shared/services/posts.sevices';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[] = [];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getAllPosts(): void {
    this.postsService.getAllPosts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: any) => {
        this.posts = response;
        console.log(this.posts);
        
      });
  }

  removerTags(html: any): any {
    const data = new DOMParser().parseFromString(html, 'text/html');
    return data.body.textContent || '';
  }
}
