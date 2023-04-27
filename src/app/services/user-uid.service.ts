import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserUidService {

  private userUid$=new ReplaySubject<string>(1);

  constructor() { }

  addUid(uid:string){
    this.userUid$.next(uid)
  }

  getUserUid():Observable<string>{
    return this.userUid$.asObservable();
  }
}
