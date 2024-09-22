import { Injectable } from "@angular/core";
import { environment } from "../../main";
import { BehaviorSubject, map, Observable, switchMap, take } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class UserService {

  private mBaseUrl = `${environment.apiUrl}/auth`;
  private mUsers = new BehaviorSubject<User[]>([]);

  get users(): Observable<User[]> {
    return this.mUsers.asObservable();
  }

  constructor(
    private http: HttpClient
  ) { }

  fetchAll() {
    return this.http.get<any[]>(`${this.mBaseUrl}`).pipe(
      map(res => {
        const users = res.map(item => new User(item));

        this.mUsers.next(users);
      })
    )
  }

  setIsAdmin(userId: string, isAdmin: boolean): Observable<void> {
    let cUsers: User[];

    return this.users.pipe(
      take(1),
      switchMap(users => {
        cUsers = users;
        const userToUpdateIndex = users.findIndex(user => user.id === userId);

        if (userToUpdateIndex > -1) {
          cUsers[userToUpdateIndex].role = isAdmin ? 'admin' : 'standard';

        }

        return this.http.put(`${this.mBaseUrl}/${userId}`, cUsers[userToUpdateIndex]);
      }),
      map(() => {
        this.mUsers.next(cUsers);
      })
    )
  }
}