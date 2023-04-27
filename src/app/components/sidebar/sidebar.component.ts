import {Component} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';
import {FirestoreService} from "../../services/firestore.service";
import {Progress, Theme, TimeDay, Words} from "../../models/data";
import {map, switchMap, tap} from "rxjs";
import {words} from "../../../assets/data/data";
import {mainData} from "../../../assets/data/generalData";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  value: any;
  themes:any

  constructor(private authService: AuthService,
              private firestore: FirestoreService) {
    this.themes=mainData.data

  }


  sign() {

    let progress: Progress = {
      id: 'id',
      name: "OOO",
      timeOfDay: [{
        date: Date.now().toString(),
        counter: 1
      }],
      countDays: 1,
      tasksCompleted: 3
    }


    const updatedProgressMain = {
      ...progress,
      countDays: progress.countDays + 1,
      timeOfDay: [
        ...progress.timeOfDay,
        {
          date: new Date().toISOString(),
          counter: progress.countDays + 1
        }
      ]
    };
    let x:TimeDay={
      date: new Date().toISOString(),
      counter:1111
    }
    let y:TimeDay={
      date: new Date().toISOString(),
      counter:10000122
    }


    this.firestore.updateProgressItem(updatedProgressMain).pipe(
        switchMap(()=> this.firestore.getProgressByIdAsync())
    ).subscribe(el=>console.log(el))
    //this.firestore.getProgressByIdAsync().subscribe(el=>console.log(el))
    // this.firestore.updateProgressItem({name:'oleg4'}).subscribe((el)=>console.log('success',el))
    //this.firestore.getDataById().subscribe(data =>console.log(data))
    // this.firestore.getProgressById().subscribe(el=>console.log(el))
    //this.firestore.getAllProgressItems().subscribe(el=>console.log(el))
    /*  this.firestore.updateProgressItem(updateProgress)
        .pipe(
          map(el=>console.log('map',el)),
        tap(el=>console.log('tap',el))
        )
        .subscribe((el)=>console.log('update success',el))*/
  }
}
