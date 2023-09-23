import {Injectable} from '@angular/core';
import {BehaviorSubject, from, map, Observable, ReplaySubject, switchMap, tap} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import {AngularFirestore} from "@angular/fire/compat/firestore";

import {FirestoreService} from "./firestore.service";
import {User} from "../admin/model/auth";
import {UserUidService} from "./user-uid.service";
import {Progress} from "../models/progress";
import {getCurrentDate} from '../helper/fn';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token$: ReplaySubject<string> = new ReplaySubject<string>(1);
  private isAuth$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public user$ = new BehaviorSubject<string>('');
  public userEmail$ = new BehaviorSubject<string>('');

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
      tap(()=> {
        this.isAuth$.next(true)
        this.userEmail$.next(email)
      }),
  /*    tap(()=> {
        let newProgress: Progress = {
          id: 'VSRYBAsobegeRYhaQUlJRQJkVtT2',
          name:"Oleg",
          timeOfDay: [{
            date: this.getCurrentDate(),
            counterScore: 0,
            countUpWordsInThisDay:0,
            countMin:0,
          }],
          countWord: 0,
          score:0
        }
        this.fires.addNewProgress(newProgress)
      })*/
    )
  }

  signUp(email: string, password: string, name: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      map(user => user.user?.uid ?? "none"),
      switchMap(id => {
        console.log(id)
        let newProgress: Progress = {
          id,
          name,
          timeOfDay: [{
            date: getCurrentDate(),
            counterScore: 0,
            countUpWordsInThisDay:0,
            countMin:0,
            detailForWordsProgress: {
              countHigh: 0,
              countMiddle: 0,
              countLow: 0
            }
          }],
          countWord: 0,
          score:0
        }
        let newUser: User = {
          uid: id,
          email,
          name,
          password
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

/*  getCurrentDate(): string {
    const datePipe = new DatePipe('en-US');
    const currentDateFormatted = datePipe.transform(new Date(), 'yyyy-MM-dd');
    return currentDateFormatted ?? Date.now().toString()
  }*/
}
