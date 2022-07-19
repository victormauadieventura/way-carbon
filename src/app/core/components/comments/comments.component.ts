import { Component, Input, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { Author } from 'src/app/shared/models/author';
import { Comments } from 'src/app/shared/models/comments';
import { ModalContent } from 'src/app/shared/models/modal-content';
import { Post } from 'src/app/shared/models/post';
import { PostService } from 'src/app/shared/services/post.sevices';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnChanges {

  @Input() comments: Comments[] = [];
  @Input() url: string = '';
  @Input() title: string | undefined = '';
  @Input() content: string | undefined = '';

  authors: Author[] = [];
  posts: Post[] = [];
  postsByAuthor: Post[] = [];
  infoAuthor: Author = {};
  tree: Comments[] = [];

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    private postService: PostService,
  ) { }

  ngOnChanges(): void {
    this.getAllAuthor();
    this.getAllPost();
    this.mountTree();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: Author[]) => {
        this.authors = response;
      });
  }

  getAllPost(): void {
    this.postService.getAllPost()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: Post[]) => {
        this.posts = response;
      });
  }

  selectModal(modal: ModalContent, id: any): void {
    switch (modal.name) {
      case 'modalComments':
        this.modalService.open(modal.content, { centered: true, size: 'md' });
        this.postsByAuthor = this.posts.filter(post => post.author === +id);
        break;
      case 'modalAuthor':
        this.modalService.open(modal.content, { centered: true, size: 'sm' });
        this.infoAuthor = this.authors.filter(author => author.id === id)[0];
        break;
    }
  }

  actionButtons(button: any): void {
    switch (button) {
      case 'whatsapp':
        this.actionShare('https://api.whatsapp.com/send?text=');
        break;
      case 'facebook':
        this.actionShare('https://www.facebook.com/sharer/sharer.php?u=');
        break;
    }
  }

  actionShare(url: string): void {
    window.open(`${url}${this.url}`, '_blank');
  }

  removerTags(html: any): any {
    const data = new DOMParser().parseFromString(html, 'text/html');
    return data.body.textContent || '';
  }
}
