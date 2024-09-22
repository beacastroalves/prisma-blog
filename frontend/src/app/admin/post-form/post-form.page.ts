import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PostService } from "../../services/post.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "../../models/post.model";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.page.html',
  styleUrls: ['./post-form.page.scss'],
})
export class PostFormPage implements OnInit {

  form: FormGroup;
  postToEdit: Post;
  editMode = false;

  constructor (
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(paraMap => {
      if (paraMap.has('id')) {
        this.editMode = true;

        this.postService.fetchById(paraMap.get('id')).subscribe(post => {
          // TODO: remove when real backend gets implemented
          post.description = post.description.replace(/<p>|<\/p>/g, '');

          this.postToEdit = post;
          this.initForm(post);
        });
      } else {
        this.initForm();
      }
    });
  }

  initForm(post?: Post) {
    this.form = new FormGroup ({
      title: new FormControl(post ? post.title : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(10)]
      }),
      description: new FormControl(post ? post.description : null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(15)]
      })
    });
  }

  hasError(control: string) {
    return this.form.get(control).invalid && this.form.get(control).touched;
  }

  getErrorName(control: string) {
    return this.form.controls[control].errors;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const { title, description } = this.form.value;

    if (this.editMode) {
      this.postService.update(this.postToEdit, title, description).subscribe(() => {
        this.router.navigate(['/posts', this.postToEdit.id]);
      });
    } else {
      this.postService.create(title, description).subscribe(() => {
        this.form.reset();
      });
    }
  }
 }