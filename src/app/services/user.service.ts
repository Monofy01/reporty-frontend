import { Injectable } from '@angular/core';
import {Auth, signInWithPopup, GoogleAuthProvider, signOut} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  logout() {
    return signOut(this.auth)
  }
}
