import { NgModule } from "@angular/core";
import { PostFormPage } from "./post-form.page";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: PostFormPage
  }
];

@NgModule({
  declarations: [PostFormPage],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class PostFormPageModule { }