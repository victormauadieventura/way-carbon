import { Component, Input, OnChanges } from '@angular/core';
import { Author } from 'src/app/shared/models/author';
import { Comments } from 'src/app/shared/models/comments';
import { PostService } from 'src/app/shared/services/post.sevices';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnChanges {

  @Input() comments: Comments[] = [];

  authors: Author[] = [];
  tree: Comments[] = [];

  constructor(
    private postService: PostService,
  ) { }

  ngOnChanges(): void {
    this.getAuthor();
    this.mountTree();
  }

  mountTree(): void {
    this.comments.forEach((comment: Comments, index) => {
      if (!comment.respondsTo) {
        this.tree.push(comment);
        this.tree[index].author = this.authors.find(author => author.id === this.tree[index].author)?.username
      } else {
        this.tree.forEach((children: Comments) => {
          if (comment.respondsTo && comment.respondsTo.id === children.id) {
            comment.author = this.authors.find(author => author.id === comment.author)?.username
            let c = new Set(children['children']);
            children['children'] = [ ...c, comment ];
          } else {
            Object.keys(children).forEach(key => {
              if (key === 'children') {
                if (children.children) {
                  children.children.forEach((children: Comments) => {
                    if (comment.respondsTo && comment.respondsTo.id === children.id) {
                      comment.author = this.authors.find(author => author.id === comment.author)?.username
                      let c = new Set(children['children']);
                      children['children'] = [ ...c, comment ];
                    }
                  });
                }
              }
            });
          }
        });
      }
    });
  }

  getAuthor(): void {
    this.postService.getAllAuthor()
      .subscribe((response: Author[]) => {
        this.authors = response;
      });
  }
}
