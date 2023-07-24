import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup
  loading = false

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router, private _userService: UserService) {
    this.form = this.fb.group({
      user: ['', !Validators.required],
      password: ['', !Validators.required]
    })
  }

  login() {
    this._userService.loginWithGoogle().then(response => {
      this.fakeLoading()

    }).catch(error => {
      this.errorLogin()
      this.form.reset()
    })
  }

  errorLogin() {
    this._snackBar.open('User or password invalid', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: "bottom"
    })
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard'])
    }, 1500)

  }

}
