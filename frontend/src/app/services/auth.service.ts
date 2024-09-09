import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, switchMap, take } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private mBaseUrl = `http://localhost:3000/auth`;
  private mUser = new BehaviorSubject<User>(null);

  get user(): Observable<User> {
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

  get authState(): Observable<User> {
    return this.user.pipe(
      take(1)
    );
  }

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<void> {
    return this.http.get<User[]>(`${this.mBaseUrl}?username=${username}&password=${password}`).pipe(
      map(users => {
        if (users.length < 1) {
          throw new Error('UserNotFound');
        }

        const { id, username, role } = users[0];

        const user: User = { id, username, role };
        this.mUser.next(user);
        localStorage.setItem('authUser', JSON.stringify(user));
      })
    );
  }

  register(username: string, password: string): Observable<void> {
    return this.http.post<any>(`${this.mBaseUrl}`, {
      username, password, role: 'standard'
    }).pipe(
      map(res => {
        const { id, username, role } = res;
        const user: User = { id, username, role };
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