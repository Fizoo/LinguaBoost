import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, from, map, Observable, ReplaySubject, switchMap, tap} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {AngularFirestore} from "@angular/fire/compat/firestore";

import {FirestoreService} from "./firestore.service";
import {User} from "../admin/model/auth";
import {Progress} from "../models/data";
import {DatePipe} from "@angular/common";
import {UserUidService} from "./user-uid.service";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token$: ReplaySubject<string> = new ReplaySubject<string>(1);
  private isAuth$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public user$ = new BehaviorSubject<string>('');

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private fires: FirestoreService,
              private userId:UserUidService
  ) {
    this.afAuth.authState.subscribe((firebaseUser) => {
      if (firebaseUser) {
        from(firebaseUser.getIdToken()).subscribe((token) => {
          this.token$.next(token);
          this.isAuth$.next(true);
          this.userId.addUid(firebaseUser.uid)
        });
      } else {
        this.token$.next('');
        this.isAuth$.next(false);
      }
    });

  }


  login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap(()=>this.isAuth$.next(true))
    )
  }

  signUp(email: string, password: string, name: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      map(user => user.user?.uid ?? "none"),
      switchMap(id => {
        let newProgress: Progress = {
          id,
          name,
          timeOfDay: [{
            date: this.getCurrentDate(),
            counter: 0
          }],
          countDays: 0,
          tasksCompleted: 0,
          score:0
        }
        let newUser: User = {
          uid: id,
          email: email,
          name: name,
          password: password
        }

        return this.fires.addNewUser(newUser)
          .pipe(
            switchMap(() => this.fires.addNewProgress(newProgress)),
            )
      }),
      tap(() => {
        console.log("User created successfully");
      }),

    )
  }

  logout(): Observable<void> {
    return from(this.afAuth.signOut())
  }


  getToken(): Observable<string> {
    const token = localStorage.getItem('token');
    if (token) {
      this.token$.next(token);
    }
    return this.token$.asObservable();
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token$.next(token);
  }

  getIsAuth(): Observable<boolean> {
    const isAuth = localStorage.getItem('isAuth');
    if (isAuth) {
      this.isAuth$.next(isAuth === 'true');
    }
    return this.isAuth$.asObservable();
  }

  setIsAuth(isAuth: boolean): void {
    localStorage.setItem('isAuth', isAuth.toString());
    this.isAuth$.next(isAuth);
  }

  getCurrentDate(): string {
    const datePipe = new DatePipe('en-US');
    const currentDateFormatted = datePipe.transform(new Date(), 'yyyy-MM-dd');
    return currentDateFormatted ?? Date.now().toString()
  }
}
