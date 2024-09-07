import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'post-form',
    loadChildren: () => import('./post-form/post-form.module').then(m => m.PostFormPageModule)
  },
  {
    path: 'users',
     loadChildren: () => import('./users/users.module').then(m => m.UsersPageModule)
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }