import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, switchMap, take } from "rxjs";
import { AuthUser } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../main";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private mBaseUrl = `${environment.apiUrl}/auth`;
  private mUser = new BehaviorSubject<AuthUser>(null);

  get user(): Observable<AuthUser> {
    return this.mUser.asObservable().pipe(
      take(1),
      switchMap(authState => {
        if (!authState) {
          const user = JSON.parse(localStorage.getItem('authUser'));

          if (user) {
            this.mUser.next(user);
          }
        }

        return this.mUser.asObservable();
      })
    );
  }

  get authState(): Observable<AuthUser> {
    return this.user.pipe(
      take(1)
    );
  }

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<void> {
    return this.http.post<AuthUser>(`${this.mBaseUrl}/signIn`, { username, password}).pipe(
      map(res => {
        const user = new AuthUser(res);
        this.mUser.next(user);
        localStorage.setItem('authUser', JSON.stringify(user));
      })
    );
  }

  register(username: string, password: string): Observable<void> {
    return this.http.post<AuthUser>(`${this.mBaseUrl}/signUp`, { username, password }).pipe(
      map(res => {
        const user = new AuthUser(res);
        this.mUser.next(user);
        localStorage.setItem('authUser', JSON.stringify(user));
      })
    );
  }

  logout() {
    this.mUser.next(null);
    localStorage.removeItem('authUser');
  }
}