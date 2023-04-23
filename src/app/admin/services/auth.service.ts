import { Injectable } from '@angular/core';
import {BehaviorSubject, from, Observable, of, shareReplay, switchMap, tap} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token$ = new BehaviorSubject<string>('');
  user$: Observable<firebase.User | null>;
  isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth) {


    this.afAuth.authState.pipe(
      tap(el=>console.log('connected',el)),
      switchMap((firebaseUser) => {
        if (firebaseUser) {
          return from(firebaseUser.getIdTokenResult()).pipe(
            switchMap((tokenResult) => {
              const user = firebaseUser;
              this.token$.next(tokenResult.token)
              console.log(tokenResult)
              this.isAuth$.next(true);
              return of(user);
            })
          );
        } else {
          this.isAuth$.next(false);
          return of(null);
        }
      }),
      shareReplay(1)
    ).subscribe()
    this.token$.pipe(tap(el=>console.log('token$',el))).subscribe()
    this.isAuth$.pipe(tap(el=>console.log('isAuth$',el))).subscribe()
  }

  login(email: string, password: string):Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
    )
  }

  signUp(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  logout():Observable<void> {
    return from(this.afAuth.signOut())
  }


  getToken(): Observable<string> {
    return this.token$.asObservable();
  }

  setToken(token: string): void {
    this.token$.next(token);
  }
}
