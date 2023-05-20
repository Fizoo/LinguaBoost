import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Words} from "../../models/data";
import {FormControl} from "@angular/forms";
import {myValidator} from "../../helper/my.validators";
import {map, Subject, switchMap, take, takeUntil, tap} from "rxjs";
import {SpeakerService} from "../../services/speaker.service";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";
import {DataSelectors} from "../../store/data/selectors";
import {DataActions} from "../../store/data/actions";
import {ProgressAction} from "../../store/progress/actions";

@Component({
  selector: 'app-lesson-translate-to-ua',
  templateUrl: './lesson-translate-to-ua.component.html',
  styleUrls: ['./lesson-translate-to-ua.component.scss']
})
export class LessonTranslateToUaComponent implements OnInit, OnDestroy{


  tempList: Words[] = []
  updateList: Words[] = []

  score = 0
  isProgressBar = false
  isFooterHide = true
  isWinChallenge = false
  isCheckingBtnDisabled = false
  resultSwitch = 1
  isHideSpanInAnswer = true
  inputValue: string = ''
  id: string
  formControlText: FormControl = new FormControl('', myValidator(''))

  private ngUnsubscribe$ = new Subject<void>();

  @HostListener('document:keydown.enter')
  onEnter() {
    this.isWinChallenge ? this.nextTo() : this.checking();
  }

  constructor(private speaker: SpeakerService,
              private store: Store,
              private route: ActivatedRoute,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(data => data['id']),
      tap(id => this.id = id),
      switchMap(id => this.store.select(DataSelectors.getRandomListWith20ById(id)).pipe(
        tap(data => {
          this.tempList = data
          //console.log(this.countWordsByLevel(data))
          this.setValidators()
        })
      )),
      take(1)
    ).subscribe()

    this.formControlText.valueChanges.pipe(
      map(el => el?.trim()),
      tap(value => {
        this.inputValue = value
        this.isCheckingBtnDisabled = !!value
      }),
      takeUntil(this.ngUnsubscribe$)
    ).subscribe()
  }

  checking() {
    this.isFooterHide = false
    this.isWinChallenge = true

    const word = this.tempList[0].ukrainianTranslation
    if (word === this.inputValue.trim()) {
      this.resultSwitch = 3
    } else {
      this.resultSwitch = 1
    }
  }

  nextTo() {
    this.isWin()
    if (this.tempList.length > 0) {
      this.isFooterHide = true
      this.isWinChallenge = false
      this.audit(this.resultSwitch)
      this.deleteValue()
    }
  }

  countWordsByLevel(wordsArray: Words[]) {
    const countByLevel: any = {};
    for (const word of wordsArray) {
      const level = word.level;
      countByLevel[level] = (countByLevel[level] || 0) + 1;
    }
    return countByLevel
  }

  private audit(value: number): void {

    let word = this.tempList.shift()

    if (word) {
      let tempListLen = this.tempList.length;
      let randomInd = Math.floor(Math.random() * (tempListLen + 1))

      switch (value) {
        case 1:
        case 2:
          word = {
            ...word,
            level: word.level > 1 ? word.level - 1 : 1
          }
          this.score -= 1;


          this.tempList.splice(randomInd, 0, word)
          this.setValidators()
          break

        case 3:
          word = {
            ...word,
            level: word.level < 3 ? word.level + 1 : 3}

          this.updateList.push(word)
          this.score+=2
          this.isWin()

          if (this.tempList.length > 0) {
            this.setValidators()
          }
          break
      }
    }
  }

  getNavbarValue() {
    const x = this.tempList.length - 1
    return x ? 100 - (x * 5) : 100
  }

  speak(value: string) {
    this.speaker.speak(value)
  }

  lossChallenge() {
    this.resultSwitch = 2
    this.isFooterHide = false
    this.isWinChallenge = true
  }

  deleteValue() {
    this.formControlText.reset()
    // this.formControlText.setValue('')
  }

  isWin(): void {

    if (this.tempList.length === 0) {
      const newDay={
        date:new Date().toLocaleDateString(),
        counter:this.score
      }
      this.store.dispatch(DataActions.updateWord({wordArr: this.updateList}))
      this.store.dispatch(ProgressAction.addOrUpdateProgress({newDay}))
      this.router.navigate(['theme/1/lessons/result'])
    }
  }
  private setValidators():void{
    this.formControlText.setValidators(myValidator(this.tempList[0].ukrainianTranslation))
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next()
    this.ngUnsubscribe$.complete()
  }
}
