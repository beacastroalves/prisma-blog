import { NgModule } from "@angular/core";
import { PostsPage } from "./posts.page";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { PostPage } from "./post/post.page";
import { SharedModule } from "../../shared/shared.Module";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: PostsPage
  },
  {
    path: ':id',
    component: PostPage
  }
];

@NgModule({
  declarations: [PostsPage, PostPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PostsPageModule { }