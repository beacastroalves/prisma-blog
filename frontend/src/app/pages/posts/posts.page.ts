import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../../models/post.model";
import { PostService } from "../../services/post.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit, OnDestroy {
  posts: Post[];

  subs: Subscription[] = [];

  constructor (
    private postService: PostService
  ) { }


  ngOnInit() {
    this.subs.push(
      this.postService.posts.subscribe(posts => {
        this.posts = posts;
      })
    );

    this.postService.fetchAll().subscribe(() => {
      console.log('sucess');
    });
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    })
  }
}