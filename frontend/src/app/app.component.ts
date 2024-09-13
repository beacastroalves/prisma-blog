import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { User } from './models/user.model';

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

  user: User;
  subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.push(
      this.authService.user.subscribe(user => {
        this.user = user;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  logout() {
    // this.router.navigate(['/posts']); TALVEZ EU TENHA GOSTADO MAIS DESSA OPÇÃO
    this.router.navigate(['/auth', 'sign-in']);
    this.authService.logout();
  }

  logo() {
    window.location.href = '/posts';
  }

  instagram() {
    // console.log('instagram');
    window.open('https://instagram.com/naterciasampaio.psi', '_blank');
  }

  whatsapp() {
    window.open('https://api.whatsapp.com/send/?phone=5585991567902&text&type=phone_number&app_absent=0', '_blank');
    // console.log('whatsapp');
  }
}
