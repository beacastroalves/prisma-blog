import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../main";
import { BehaviorSubject, Observable, map, of, switchMap } from "rxjs";
import { Post, PostComment } from "../models/post.model";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class PostService {

  private mBaseUrl = `${environment.apiUrl}/posts`;
  private mPosts = new BehaviorSubject<Post[]>([]);
  private mPostsComments = new BehaviorSubject<PostComment[]>([]);

  get posts(): Observable<Post[]> {
    return this.mPosts.asObservable();
  }

  get postComments(): Observable<PostComment[]> {
    return this.mPostsComments.asObservable();
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

  fetchById(id: number): Observable<Post> {
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

  create(title: string, description: string, selectedImage: File): Observable<Post> {
    let cPost: Post;

    return this.authService.authState.pipe(
      switchMap(authState => {
        return this.http.post(`${this.mBaseUrl}`, {
          title: title,
          description: description,
        }, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
      }),
      switchMap(res => {
        cPost = new Post(res);
        return this.authService.authState;
      }),
      switchMap(authState => {

        const formData: FormData = new FormData();
        formData.append('file', selectedImage);

        return this.http.post(`${environment.apiUrl}/storage/${cPost.id}`, formData, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          },
          responseType: 'text'
        });
      }),
      map(() => {
        return cPost;
      })
    );
  }

  update(postId: number, title: string, description: string, selectedImage: File): Observable<void> {
    return this.authService.authState.pipe(
      switchMap(authState => {
        return this.http.put(`${this.mBaseUrl}/${postId}`, { title, description }, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
      }),
      switchMap(() => {
        return this.authService.authState;
      }),
      switchMap(authState => {
        const formData: FormData = new FormData();
        formData.append('file', selectedImage);

        return this.http.post(`${environment.apiUrl}/storage/${postId}`, formData, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          },
          responseType: 'text'
        });
      }),
      map(() => {})
    );
  }

  delete(postId: number): Observable<void> {
    return this.authService.authState.pipe(
      switchMap(authState => {
        return this.http.delete(`${this.mBaseUrl}/${postId}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
      }),
      map(() => {})
    );
  }

  fetchAllCommentsById(postId: number): Observable<void> {
    return this.http.get<any[]>(`${this.mBaseUrl}/${postId}/comments`).pipe(
      map(res => {
        this.mPostsComments.next(res.map(item => new PostComment(item)));
      })
    );
  }

  createComment(postId: number, text: string): Observable<void> {
    return this.authService.authState.pipe(
      switchMap(authState => {
        return this.http.post(`${this.mBaseUrl}/${postId}/comments`, { text }, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
      }),
      switchMap(() => {
        return this.fetchAllCommentsById(postId)
      })
    );
  }

  editComment(postId: number, commentId: number, text: string): Observable<void> {
    return this.authService.authState.pipe(
      switchMap(authState => {
        return this.http.put(`${this.mBaseUrl}/${postId}/comments/${commentId}`, { text }, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        })
      }),
      switchMap(() => {
        return this.fetchAllCommentsById(postId)
      })
    )
  }

  deleteComment(postId: number, commentId: number): Observable<void> {
    return this.authService.authState.pipe(
      switchMap(authState => {
        return this.http.delete(`${this.mBaseUrl}/${postId}/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
      }),
      switchMap(() => {
        return this.fetchAllCommentsById(postId)
      })
    );
  }
}