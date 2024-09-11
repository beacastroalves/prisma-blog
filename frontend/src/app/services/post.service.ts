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
        this.mPosts.next(res.map(item => new Post(item)));
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
}