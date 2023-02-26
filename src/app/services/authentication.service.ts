import { Injectable } from '@angular/core';
import { Auth, UserInfo, signInWithEmailAndPassword, createUserWithEmailAndPassword,  authState, updateProfile} from '@angular/fire/auth';
import { UserCredential } from '@firebase/auth-types';
import { from, Observable, map, of, concatMap} from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
     concatMap((user) => {
       if (!user) throw new Error('Not authenticated');

        return updateProfile(user, profileData);
      })
    );
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }
}
