import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, observable, of } from 'rxjs';
import { User } from '../models/User'
import { Roles } from '../models/Roles'
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {
    //  Get auth data, then get firestore user document || null
    this.user = this.angularFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.angularFirestore.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }


  getAuth() {
    return this.angularFireAuth.authState.pipe(map(auth => auth));
  }

  // Login/Signup
  async googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return await this.oAuthLogin(provider)
  }

  async signOut() {
    await this.angularFireAuth.signOut();
    return this.router.navigate(['/login']);
  }

  private async oAuthLogin(provider) {
    return await this.angularFireAuth.signInWithPopup(provider)
      .then((credential => {
        this.updateUserData(credential.user)
        this.router.navigate(['/']);
      }))
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.email,
      roles: {
        subscriber: true
      }
    };

    return userRef.set(data, { merge: true });
  }

  isAdmin(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}
