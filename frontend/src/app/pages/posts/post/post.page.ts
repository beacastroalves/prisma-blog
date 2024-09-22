import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../../../services/post.service";
import { Post } from "../../../models/post.model";
import { environment } from "../../../../main";
import { AuthService } from "../../../services/auth.service";
import { Subscription } from "rxjs";
import { User } from "../../../models/user.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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

  commentForm: FormGroup;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
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
    );

    this.commentForm = new FormGroup({
      text: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(10)]
      })
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  edit() {
    this.router.navigate(['/admin', 'post-form', this.post.id]);
  }

  delete() {
    if (confirm(`Tem certeza que deseja apagar esta publicação?`)) {
      this.postService.delete(this.post.id).subscribe(() => {
        this.router.navigate(['/posts']);
      });
    }
  }

  postComment() {
    if (this.commentForm.invalid) {
      return;
    }

    const { text } = this.commentForm.value;

    this.postService.createComment(this.post, text).subscribe(() => {
      this.commentForm.reset();
    });
  }

  editComment(commentIndex: number) {
    const newComment = prompt('Edite seu comentário', this.post.comments[commentIndex].text);
    console.log(newComment);

    if (newComment.length > 10) {
      this.postService.editComment(this.post, commentIndex, newComment).subscribe();
    } else {
      alert('Mínimo 10 caracteres para comentários')
    }
  }

  deleteComment(commentIndex: number) {
    const comment = this.post.comments[commentIndex];
    if (confirm(`Tem certeza que deseja remover o comentário: "${comment.text}" de ${comment.username}?`)) {
      this.postService.deleteComment(this.post, commentIndex).subscribe();
    }
  }
}