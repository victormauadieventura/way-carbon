import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.sevices';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.getAllModelsEquipaments();
  }

  getAllModelsEquipaments(): void {
    this.postsService.getAllPosts()
      .subscribe((response: any) => {
        console.log(response);
        
      });
  }

}
