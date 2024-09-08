import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component ({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage implements OnInit {

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(6)]
      }),
      password: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    }, {
      validators: control => {
        const passwordControl = control.get('password');
        const confirmPasswordControl = control.get('confirmPassword');

        if (
          passwordControl.value &&
          confirmPasswordControl.value &&
          passwordControl.value !== confirmPasswordControl.value
        ) {
          confirmPasswordControl.setErrors({ passwordMismatch: true })
        }

        return null;
      }
    })
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

    const { username, password } = this.form.value;
    this.authService.register(username, password).subscribe(() => {
      this.router.navigate(['/posts']);
    });
  }
}