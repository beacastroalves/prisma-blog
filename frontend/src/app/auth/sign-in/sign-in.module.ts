import { NgModule } from "@angular/core";
import { SignInPage } from "./sign-in.page";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

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
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class SignInPageModule { }