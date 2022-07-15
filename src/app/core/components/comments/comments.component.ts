import { Component, Input, OnChanges } from '@angular/core';
import { Author } from 'src/app/shared/models/author';
import { Comments } from 'src/app/shared/models/comments';
import { ModalContent } from 'src/app/shared/models/modal-content';
import { PostService } from 'src/app/shared/services/post.sevices';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnChanges {

  @Input() comments: Comments[] = [];

  authors: Author[] = [];
  posts: Post[] = [];
  postsByAuthor: Post[] = [];
  tree: Comments[] = [];

  constructor(
    private modalService: NgbModal,
    private postService: PostService,
  ) { }

  ngOnChanges(): void {
    this.getAllAuthor();
    this.getAllPost();
    this.mountTree();
  }

  mountTree(): void {
    this.comments.forEach((comment: Comments, index) => {
      if (!comment.respondsTo) {
        this.tree.push(comment);
        this.tree[index].username = this.authors.find(author => author.id === this.tree[index].author)?.username
      } else {
        this.tree.forEach((children: Comments) => {
          if (comment.respondsTo && comment.respondsTo.id === children.id) {
            comment.username = this.authors.find(author => author.id === comment.author)?.username
            let c = new Set(children['children']);
            children['children'] = [ ...c, comment ];
          } else {
            Object.keys(children).forEach(key => {
              if (key === 'children') {
                if (children.children) {
                  children.children.forEach((children: Comments) => {
                    if (comment.respondsTo && comment.respondsTo.id === children.id) {
                      comment.username = this.authors.find(author => author.id === comment.author)?.username
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

  getAllAuthor(): void {
    this.postService.getAllAuthor()
      .subscribe((response: Author[]) => {
        this.authors = response;
      });
  }

  getAllPost(): void {
    this.postService.getAllPost()
      .subscribe((response: Post[]) => {
        this.posts = response;
      });
  }

  selectModal(modal: ModalContent, id: any): void {
    if (modal.name === 'modalComments') {
      this.modalService.open(modal.content, { centered: true, size: 'md' });
      this.postsByAuthor = this.posts.filter(post => post.author === +id);
      return;
    }
  }

  removerTags(html: any): any {
    const data = new DOMParser().parseFromString(html, 'text/html');
    return data.body.textContent || '';
  }
}
