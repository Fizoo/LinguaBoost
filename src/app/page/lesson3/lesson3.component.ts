import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {ProgressSelectors} from "../../store/progress/selectors";
import {filter, first} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lesson3',
  templateUrl: './lesson3.component.html',
  styleUrls: ['./lesson3.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Lesson3Component implements OnInit{
  countScore:number=0
  countLessons:number=0
  percentage:number=0

  @HostListener('document:keydown.enter')
  onEnter() {
    this.router.navigate(['theme/-1'])
  }

  constructor(private store:Store,
              private router:Router
              ) {
  }

  ngOnInit(): void {
    this.store.select(ProgressSelectors.getProgressByThisDay).pipe(
      filter(Boolean),
      first(),
    ).subscribe(progress=>{
      this.countScore=progress.counterScore
      this.countLessons=Math.ceil (progress.countUpWordsInThisDay/20)
      this.percentage=Math.round(((progress.counterScore/2)/progress.countUpWordsInThisDay)*100)
     // debugger
    })
  }

}
