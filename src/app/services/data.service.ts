import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {mainData} from 'src/assets/data/generalData';

import {Main} from "../models/data";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  data$=new BehaviorSubject<Main>(mainData)

  constructor() {
    //this.data$.next(mainData);
  }
}
