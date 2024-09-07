import { NgModule } from "@angular/core";
import { UsersPage } from "./users.page";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: UsersPage
  }
];

@NgModule({
  declarations: [UsersPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersPageModule { }