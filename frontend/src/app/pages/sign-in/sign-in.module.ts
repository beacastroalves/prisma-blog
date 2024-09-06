import { NgModule } from "@angular/core";
import { SignInPage } from "./sign-in.page";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: SignInPage
  }
];

@NgModule({
  declarations: [SignInPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SignInPageModule { }