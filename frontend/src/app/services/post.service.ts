import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../main";
import { BehaviorSubject, Observable, map, switchMap } from "rxjs";
import { Post } from "../models/post.model";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class PostService {

  private mBaseUrl = `${environment.apiUrl}/posts`;
  private mPosts = new BehaviorSubject<Post[]>([]);

  get posts(): Observable<Post[]> {
    return this.mPosts.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  fetchAll(): Observable<void> {
    return this.http.get<any[]>(`${this.mBaseUrl}`).pipe(
      map(res => {
        const posts = res.map(item => {
          if (item.description.length > 125) {
            item.description = `${item.description.substr(0, 125).trim()}...`;
          }
          return new Post(item)
        });
        this.mPosts.next(posts);
      })
    );
  }

  fetchById(id: string): Observable<Post> {
    return this.http.get<any>(`${this.mBaseUrl}/${id}`).pipe(
      map(res => {
        // TODO: remove when real backend gets implemented
        res.description = (res.description as string).split('\n').filter(p => {
          return p;
        }).map(p => {
          return `<p>${p}</p>`;
        }).join('\n');

        return new Post(res);
      })
    );
  }

  create(title: string, description: string): Observable<void> {
    return this.authService.authState.pipe(
      switchMap(authState => {
        return this.http.post(`${this.mBaseUrl}`, {
      createdAt: new Date(),
      updatedAt: new Date(),
      title: title,
      description: description,
      user: {
        username: authState.username
      }
    });
  }),
      map(res => {
        console.log(res);
      })
    );
  }

  update(post: Post, title: string, description: string): Observable<void> {

    return this.http.put(`${this.mBaseUrl}/${post.id}`, {
      ...post,
      title,
      description,
      updatedAt: new Date()
    }).pipe(
      map(() => {})
    );
  }

  delete(postId: string): Observable<void> {
    return this.http.delete(`${this.mBaseUrl}/${postId}`).pipe(
      map(() => {})
    )
  }

  createComment(post: Post, text: string): Observable<void> {
    return this.authService.authState.pipe(
      switchMap(authState => {
        post.comments.push({
          createdAt: new Date(), text, username: authState.username
        });

        // TODO: remove when real backend gets implemented
        const postToSend = { ...post };
        postToSend.description = post.description.replace(/<p>|<\/p>/g, '');

        return this.http.put(`${this.mBaseUrl}/${post.id}`, postToSend);
      }),
      map(() => {})
    );
  }

  editComment(post: Post, commentIndex: number, text: string): Observable<void> {
    post.comments[commentIndex].text = text;

    const postToSend = { ...post };
    postToSend.description = post.description.replace(/<p>|<\/p>/g, '');

    return this.http.put(`${this.mBaseUrl}/${post.id}`, postToSend).pipe(
      map(() => {})
    )
  }

  deleteComment(post: Post, commentIndex: number): Observable<void> {
    post.comments = post.comments.filter((_, i) => i !== commentIndex);

    const postToSend = { ...post };
    postToSend.description = post.description.replace(/<p>|<\/p>/g, '');

    return this.http.put(`${this.mBaseUrl}/${post.id}`, postToSend).pipe(
      map(() => {})
    )
  }
}