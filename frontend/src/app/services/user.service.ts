import { Injectable } from "@angular/core";
import { environment } from "../../main";
import { BehaviorSubject, map, Observable, switchMap, take } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class UserService {

  private mBaseUrl = `${environment.apiUrl}/users`;
  private mUsers = new BehaviorSubject<User[]>([]);

  get users(): Observable<User[]> {
    return this.mUsers.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  fetchAll() {
    return this.authService.authState.pipe(
      switchMap(authState => {
        return this.http.get<any[]>(`${this.mBaseUrl}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
      }),
      map(res => {
        const users = res.map(item => new User(item));

        this.mUsers.next(users);
      })
    )
  }

  setIsAdmin(userId: number, isAdmin: boolean): Observable<void> {
    return this.authService.authState.pipe(
      switchMap(authState => {
        return this.http.patch(`${this.mBaseUrl}/${userId}`, { isAdmin }, {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        });
      }),
      switchMap(() => this.fetchAll())
    )
  }
}