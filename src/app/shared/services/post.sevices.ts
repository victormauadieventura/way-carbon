import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private path: any;
  private readonly apiPathPosts: string = '';
  private readonly apiPathAuthor: string = '';

  constructor(private http: HttpClient) {
    this.path = environment.services.authentication.path;
    this.apiPathPosts = `${this.path}posts`;
    this.apiPathAuthor = `${this.path}author`;
  }

  getPost(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiPathPosts}/${id}`,).pipe(
      map(response => response)
    );
  }

  getAuthor(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiPathAuthor}/${id}`,).pipe(
      map(response => response)
    );
  }
}