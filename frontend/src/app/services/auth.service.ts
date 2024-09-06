import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private mUsername = new Subject<string>();

  get username(): Observable<string> {
    return this.mUsername.asObservable();
  }

  login() {
    this.mUsername.next('beacastro');
  }

  logout() {
    this.mUsername.next('');
  }
}