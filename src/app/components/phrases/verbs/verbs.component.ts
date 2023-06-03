import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Phrase, TopicPhrases} from "../../../models/data";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from '@angular/router';
import {DataSelectors} from "../../../store/data/selectors";
import {SpeakerService} from "../../../services/speaker.service";

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class VerbsComponent implements OnInit,OnDestroy{
  search: string=''
  formSort=new FormControl<string>('')
  phraseObj:TopicPhrases

  private unSubscribe$=new Subject<void>()

  constructor(private store:Store,
              private route: ActivatedRoute,
              private cdr:ChangeDetectorRef,
              private speaker:SpeakerService
              ) {
  }


  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['id']),
        switchMap(id =>this.store.select(DataSelectors.getPhrasesById(+id)).pipe(
          tap(data=> {
            this.phraseObj = data
            this.cdr.detectChanges()
          }),
        )),
        takeUntil(this.unSubscribe$)
      ).subscribe();

    this.formSort.valueChanges.pipe(
      takeUntil(this.unSubscribe$),
    ).subscribe((value)=>{
      if(value){
      this.phraseObj={
          ...this.phraseObj,
        data:this.sortFn(value)
      }
      }
    })
  }

  sortFn(value:string):Phrase[]{
    let tempList=[...this.phraseObj.data]
    let filteredData = tempList.filter((el) => el.isFavorite);

    switch (value){
      case 'up':
        tempList.sort((a,b)=>a.phrase.localeCompare(b.phrase))
        break
      case 'down':
        tempList.sort((a,b)=>b.phrase.localeCompare(a.phrase))
        break
      case 'random':
        tempList.sort(()=>Math.random()-0.5)
        break
      case 'favorite':
        return filteredData;
        console.log('temp',tempList)
        console.log('origin',tempList)
        console.log('phrase',this.phraseObj.data)
        break
      default : break
    }
    return tempList
  }

  trackByFn(index: number, item: Phrase) {
    return item.id
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next()
    this.unSubscribe$.complete()
  }

  speak(value: string) {
    this.speaker.speak(value)
  }
}
