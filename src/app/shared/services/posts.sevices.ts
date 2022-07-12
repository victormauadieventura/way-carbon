import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private path: any;
  private readonly apiPathPosts: string = '';

  constructor(private http: HttpClient) {
    this.path = environment.services.authentication.path;
    this.apiPathPosts = `${this.path}posts`;
 }

  getAllPosts(): Observable<any> {
    console.log(this.apiPathPosts);
    return this.http.get<any>(this.apiPathPosts);
  }
}