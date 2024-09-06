import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'posts',
    loadChildren: () => import('./pages/posts/posts.module').then(m => m.PostsPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sing-up/sign-up.module').then(m => m.SignUpPageModule)
  },
  {
    path: 'admin/post-form',
    loadChildren: () => import('./admin/post-form/post-form.module').then(m => m.PostFormPageModule)
  },
  {
    path: 'admin/users',
     loadChildren: () => import('./admin/users/users.module').then(m => m.UsersPageModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/posts'
  }
];
