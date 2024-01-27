import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {first, Observable, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {ProgressSelectors} from "../../store/progress/selectors";
import {DetailProgress} from "../../models/progress";

@Component({
  selector: 'app-lesson2',
  templateUrl: './lesson2.component.html',
  styleUrls: ['./lesson2.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Lesson2Component implements OnInit{
  counterScore:number=0
  recordScore$:Observable<number>
  middleScore$:Observable<number>
  recordTime$:Observable<number>
  middleTime$:Observable<number>
  timeSec:number
  minutes:number
  seconds:number
  arrWords:DetailProgress
  middleTML:DetailProgress
  topTML:DetailProgress

  @HostListener('document:keydown.enter')
  onEnter() {
    this.router.navigate(['theme/:id/:lessons/result/goal'])
  }
  constructor(private route:ActivatedRoute,
              private router:Router,
              private store:Store,
              ) {
  }

  ngOnInit(): void {
    //this.store.select(ProgressSelectors)

    this.route.queryParams.pipe(
      first(),
    ).subscribe(params => {
      const { counterScore, countMin, detailForWordsProgress } = params;
      if (counterScore || countMin || detailForWordsProgress) {
        this.counterScore = +counterScore;
        this.timeSec=countMin
        this.minutes = Math.floor(countMin / 60);
        this.seconds = Math.floor(countMin % 60);
        this.arrWords = JSON.parse(detailForWordsProgress);
      }
    })

    this.recordScore$=this.store.select(ProgressSelectors.getRecordScore).pipe(tap(el=>console.log('getRecordScore=',el)))
    this.recordTime$= this.store.select(ProgressSelectors.getRecordTime).pipe(tap(el=>console.log('getRecordTime=',el)))
    this.middleTime$= this.store.select(ProgressSelectors.getMiddleTime).pipe(tap(el=>console.log('getMiddleTime=',el)))
    this.middleScore$= this.store.select(ProgressSelectors.getMiddleScore).pipe(tap(el=>console.log('getMiddleScore=',el)))
    this.store.select(ProgressSelectors.getMiddleTML).pipe(first()).subscribe(data=>{
      this.middleTML=data
      console.log('getMiddleTML=',data)
    })
    this.store.select(ProgressSelectors.getBestDetailForWordsProgress).pipe(first()).subscribe(data=>{
      console.log('getBestDetailForWordsProgress=',data)
      this.topTML=data
    })
  }


}
