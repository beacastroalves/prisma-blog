import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../../models/post.model";
import { PostService } from "../../services/post.service";
import { Subscription } from "rxjs";
import { environment } from "../../../main";
import { Router } from "@angular/router";

@Component({
  selector: 'posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit, OnDestroy {
  posts: Post[];

  imageUrl = `${environment.apiUrl}/storage/`
  subs: Subscription[] = [];

  constructor (
    private postService: PostService,
    private router: Router
  ) { }


  ngOnInit() {
    this.subs.push(
      this.postService.posts.subscribe(posts => {
        this.posts = posts;
      })
    );

    this.postService.fetchAll().subscribe();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    })
  }

  detail(post: Post) {
    this.router.navigate(['/posts', post.id]);
  }
}