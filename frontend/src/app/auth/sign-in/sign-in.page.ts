import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss']
})
export class SignInPage {

  constructor(
    private authService: AuthService
  ) { }

  login() {
    this.authService.login('beacastro', 'secret') .subscribe(res => {
      console.log(res);
    });
  }
}