import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-author',
  templateUrl: './post-author.component.html',
  styleUrls: ['./post-author.component.scss']
})
export class PostAuthorComponent implements OnInit {

  @Input() username: string | undefined = '';
  @Input() avatar: string | undefined = '';
  @Input() data: string | undefined = '';

  constructor() { }

  ngOnInit(): void {
  }
}
