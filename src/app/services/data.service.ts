import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {data} from "../../assets/data/data";
import {Data} from "../models/data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data$=new BehaviorSubject<Data[]>([])
  constructor() {
    this.data$.next(data)
  }
}
