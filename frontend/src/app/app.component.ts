import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements  OnInit, OnDestroy{

  username: string;
  subs: Subscription[] = [];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.authService.username.subscribe(username => {
        this.username = username;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  logout() {
    this.authService.logout();
  }
}
