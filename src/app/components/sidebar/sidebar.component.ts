import {Component, ViewEncapsulation} from '@angular/core';
import {Theme, Words} from "../../models/data";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {DataSelectors} from "../../store/data/selectors";
import {take} from "rxjs";
import {TimeDay} from "../../models/progress";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent {
  inputValue: string = ''
  themes: Theme[]=[]

  constructor(private router: Router,
              private store:Store) {
    this.store.select(DataSelectors.getAllState) .pipe(take(1)).subscribe((data)=>{
      this.themes=data
    })
  }

  navigate(id: string) {
    this.router.navigate(['/theme', id])
  }

  trackByFn(index: number, item: Theme) {
    return item.id
  }

  sign() {

    let x: TimeDay = {
      date: new Date().toISOString(),
      counter: 1111
    }
    let y: TimeDay = {
      date: new Date().toISOString(),
      counter: 10000122
    }

    let theme1: Words[] = [{
      id: 2,
      englishTranscription: "ˌæksəˈdɛntəli",
      englishWord: "1111111111111accidentally",
      englishSentence: "I accidentally spilled my coffee on my shirt.",
      ukrainianTranslationOfSentence: "Я випадково пролив свою каву на свою сорочку.",
      synonyms: ["unintentionally", "by chance"],
      idTheme: 1,
      ukrainianTranslation: "випадково",
      level: 1
    }]
    /*this.firestore.updateWord1(
      2,
      {
        englishWord: "hello"
      }
    ).subscribe()*/
    /* this.firestore.addThemeAddCol({
       data:theme1,
       name: "Oleg",
       id:'1'
     }).subscribe()*/
    /* this.firestore.addTheme(mainData.data[0]
     ).subscribe()*/

    /* this.firestore.updateProgressItem(updatedProgressMain).pipe(
         switchMap(()=> this.firestore.getProgressByIdAsync())
     ).subscribe(el=>console.log(el))*/
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
