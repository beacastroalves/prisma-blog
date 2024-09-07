import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, take } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private mBaseUrl = `http://localhost:3000/auth`;
  private mUser = new BehaviorSubject<User>(null);

  get user(): Observable<User> {
    return this.mUser.asObservable();
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
        if (users.length !== 1) {
          throw new Error('UserNotFound');
        }

        const { username, role } = users[0];

        this.mUser.next({ username, role });
      })
    );
  }

  logout() {
    this.mUser.next(null);
  }
}