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

  constructor(private http: HttpClient) {
    this.path = environment.services.authentication.path;
    this.apiPathPosts = `${this.path}posts`;
 }

 getPosts(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiPathPosts}/${id}`,).pipe(
    map(response => response)
  );
}
}