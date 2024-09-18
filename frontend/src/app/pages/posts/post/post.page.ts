import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "../../../services/post.service";
import { Post } from "../../../models/post.model";
import { environment } from "../../../../main";
import { AuthService } from "../../../services/auth.service";
import { Subscription } from "rxjs";
import { User } from "../../../models/user.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss']
})
export class PostPage implements OnInit, OnDestroy {

  imageUrl = `${environment.apiUrl}/images/`;
  user: User;
  post: Post;
  subs: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.postService.fetchById(paramMap.get('id')).subscribe(post => {
        this.post = post;
      });
    });

    this.subs.push(
      this.authService.user.subscribe(user => {
        this.user = user;
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}