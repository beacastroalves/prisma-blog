import { Component, OnDestroy, OnInit } from "@angular/core";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit, OnDestroy {
  users: User[];
  subs: Subscription[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.subs.push(
      this.userService.users.subscribe(users => {
        this.users = users;
      })
    );

    this.userService.fetchAll().subscribe();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  setAdmin(isAdmin: boolean) {

  }
 }