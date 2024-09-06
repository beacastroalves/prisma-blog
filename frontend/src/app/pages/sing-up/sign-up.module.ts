import { NgModule } from "@angular/core";
import { SignUpPage } from "./sign-up.page";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: SignUpPage
  }
];

@NgModule({
  declarations: [SignUpPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SignUpPageModule {  }