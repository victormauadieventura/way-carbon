import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
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

  @Input() id: number | undefined;
  @Input() comments: Comments[] = [];
  @Input() url: string = '';
  @Input() title: string | undefined = '';
  @Input() content: string | undefined = '';

  authors: Author[] = [];
  posts: Post[] = [];
  comment: any = {};
  postsByAuthor: Post[] = [];
  infoAuthor: Author = {};
  tree: Comments[] = [];
  formSubmitted = false;
  respond: boolean = false;
  commentId!: number;

  formGroup: FormGroup = this.formBuilder.group({
    comment: [null, [Validators.required]], // Comentário
  });
  
  tc(value: any): Comments { return value as Comments; }
  
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
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
        this.tree[index].username = this.authors.find(author => author.id === this.tree[index].author)?.username;
      } else {
        this.tree.forEach((children: Comments) => {
          if (comment.respondsTo && comment.respondsTo.id === children.id) {
            comment.username = this.authors.find(author => author.id === comment.author)?.username;
            let c = new Set(children.children);
            children.children = [ ...c, comment ];
            children.children = children.children.filter((c, i) => {
              return children.children?.indexOf(c) === i;
            });
          } else {
            this.mountTreeChildren(children, comment);
          }
        });
      }
    });
  }

  mountTreeChildren(children: Comments, comment: Comments): void {
    Object.keys(children).forEach(key => {
      if (key === 'children') {
        if (children.children) {
          children.children.forEach((children: Comments) => {
            if (comment.respondsTo && comment.respondsTo.id === children.id) {
              comment.username = this.authors.find(author => author.id === comment.author)?.username;
              let c = new Set(children.children);
              children.children = [ ...c, comment ];
            } else {
              this.mountTreeChildren(children, comment)
            }
          });
        }
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

  getComment(): void {
    this.postService.getComment(this.id!)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: any) => {
        this.comments = response.comments;
        this.tree = [];
        this.mountTree();
      });
  }

  createId(): number {
    let ids: any[] = this.comments.map((comment: Comments) => comment.id);
    let max = ids.reduce(function(a, b) {
      return Math.max(a, b);
    }, -Infinity);
    return max + 1;
  }

  beforeSaving(id: number): void {
    let comment = {
      id: this.createId(),
      respondsTo: { id: id },
      author: 1,
      timestamp: moment().format('YYYY-MM-DDThh:mm[Z]'),
      content: this.formGroup.value.comment,
    }

    this.comments.forEach(comment => {
      delete comment.children;
    })

    this.comments = [ ...this.comments, comment ];

    this.comment = {
      id: 1,
      comments: this.comments,
    }
  }

  onSubmit(): void {
    this.create();
  }

  create() {
    this.postService.createComment(this.comment, this.id!)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.formSubmitted = true;
        this.formGroup.get('comment')?.setValue('');
        this.respond = false;
        this.getComment();
    }, error => {
      console.error(error);
    })
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

  actionButtons(button: any, id?: any): void {
    switch (button) {
      case 'whatsapp':
        this.actionShare('https://api.whatsapp.com/send?text=');
        break;
      case 'facebook':
        this.actionShare('https://www.facebook.com/sharer/sharer.php?u=');
        break;
      case 'respond':
        this.commentId = id;
        this.respond = true;
        break;
      case 'save':
        this.beforeSaving(id);
        this.onSubmit();
        break;
      case 'cancel':
        this.respond = false;
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