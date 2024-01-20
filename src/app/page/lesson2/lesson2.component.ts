import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {first, Observable} from "rxjs";
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
    this.route.queryParams.pipe(
      first(),
    ).subscribe(params => {
      const { counterScore, countMin, detailForWordsProgress } = params;
      if (counterScore || countMin || detailForWordsProgress) {
        this.counterScore = +counterScore;
        this.minutes = Math.floor(countMin / 60);
        this.seconds = Math.floor(countMin % 60);
        this.arrWords = JSON.parse(detailForWordsProgress);
      }
    })

    this.recordScore$=this.store.select(ProgressSelectors.getRecordScore)
    this.recordTime$= this.store.select(ProgressSelectors.getRecordTime)
    this.middleTime$= this.store.select(ProgressSelectors.getMiddleTime)
    this.middleScore$= this.store.select(ProgressSelectors.getMiddleScore)
    this.store.select(ProgressSelectors.getMiddleTML).pipe(first()).subscribe(data=>{
      this.middleTML=data
    })
    this.store.select(ProgressSelectors.getBestDetailForWordsProgress).pipe(first()).subscribe(data=>{
      this.topTML=data
    })
  }


}
