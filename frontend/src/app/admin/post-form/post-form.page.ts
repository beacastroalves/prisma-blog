import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PostService } from "../../services/post.service";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.page.html',
  styleUrls: ['./post-form.page.scss'],
})
export class PostFormPage implements OnInit {

  form: FormGroup;

  constructor (
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup ({
      title: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(10)]
      }),
      description: new FormControl(null, {
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
    this.postService.create(title, description).subscribe(() => {
      this.form.reset();
    });
  }
 }