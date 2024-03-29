import {Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {
  catchError,
  distinctUntilChanged,
  map,
  shareReplay,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  throwError
} from "rxjs";
import {myValidator} from "../../helper/my.validators";
import {Words} from "../../models/data";

import {Store} from "@ngrx/store";
import {DataSelectorsWords} from "../../store/data/selectors";
import {DataActions} from "../../store/data/actions";
import {DetailProgress, TimeDay} from "../../models/progress";
import {ProgressAction} from "../../store/progress/actions";
import {getCurrentDate} from 'src/app/helper/fn';
import {SpeakerService} from "../../services/speaker.service";
import {FirestoreService} from "../../services/firestore.service";

export interface tempList {
  id: number
  englishWord: string
  englishTranscription: string
  ukrainianTranslation: string
  englishSentence: string;
  ukrainianTranslationOfSentence: string;
  synonyms: string[];
  level?: number
  idTheme: number
  challenge: number
}

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LessonComponent implements OnInit, OnDestroy {
  tempList: Words[] = []
  updateList: Words[] = []

  formControlText: FormControl = new FormControl('', myValidator(''))

  score = 0
  countUpWordsInThisDay = 0
  countMin = 0
  startTime: number

  isProgressBar = false
  isFooterHide = true
  isWinChallenge = false
  isCheckingBtnDisabled = false
  isBeforeCheckBtn = true
  resultSwitch = 1
  resultSwitchBorder =2
  isHideSpanInAnswer = false
  inputValue: string = ''
  whatLesson: number
  id: string
  voices:Array<SpeechSynthesisVoice> =[]

  private ngUnsubscribe$ = new Subject<void>();
  isAnswer=1

  @HostListener('document:keydown.enter')
  onEnter() {
    this.isWinChallenge ? this.nextTo() : this.checking();
  }

  constructor(private speaker: SpeakerService,
              private firestore:FirestoreService,
              private store: Store,
              private route: ActivatedRoute,
              private router: Router,
              ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      map(data => data['id']),
      tap(id => this.id = id),
      switchMap(id => this.store.select(DataSelectorsWords.getRandomListWith20ById(id)).pipe(
        tap(data => {
          this.tempList = data.map(el => ({...el, tempLevel: 3}))
          this.setValidators()
          this.extracted()
        }),
        distinctUntilChanged(),
        shareReplay(1),
        catchError(()=> {
          this.router.navigate(['theme',this.id])
          return throwError(() => new Error('Unable to retrieve data.'));
        })
      )),
      take(1),
    ).subscribe()

    this.formControlText.valueChanges.pipe(
      map(el => el?.trim()),
      tap(value => {
        this.inputValue = value
        this.isCheckingBtnDisabled = !!value
      }),
      takeUntil(this.ngUnsubscribe$)).subscribe()

    this.startTime = performance.now()
  }


  checking() {
    this.isFooterHide = false
    this.isWinChallenge = true
    this.isBeforeCheckBtn = false
    this.isAnswer=0
    this.equalsWords()
  }

  closeKeyboard() {
    // Закрити клавіатуру
 //   this.renderer.selectRootElement(this.el.nativeElement).blur();
  }

  nextTo() {
    this.isFooterHide = true
    this.isWinChallenge = false
    this.isBeforeCheckBtn = true
    this.isAnswer=1
    this.resultSwitchBorder=2
    //this.whatLesson = 1
    this.audit(this.resultSwitch)
    this.deleteValue()


    if (this.updateList.length < 20 && this.whatLesson===1) {
      this.speaker.speak(this.tempList[0].englishWord)
    }
  }

  isWin(): void {
    if (this.updateList.length === 20) {

      const {countMin, counterScore,detailForWordsProgress} = this.getProgressOfDay()

      this.store.dispatch(DataActions.updateWord({wordArr: this.updateList}))
      this.store.dispatch(ProgressAction.updateProgress({progressOfDay: this.getProgressOfDay()}))
      this.router.navigate(['theme', this.updateList[0].idTheme.toString(), 'lessons', 'result'],
        {
          queryParams: {
            countMin, counterScore,
            detailForWordsProgress: JSON.stringify(detailForWordsProgress)
          }
        }).then()
    }
  }

  lossChallenge() {
    this.resultSwitch = 2
    this.isFooterHide = false
    this.isBeforeCheckBtn = false
    this.isWinChallenge = true
    this.isAnswer=0
    this.resultSwitchBorder=0

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
            tempLevel: word?.tempLevel ? word.tempLevel - 1 : 0,
            level: word.level > 0 ? word.level - 1 : 0
          }
          this.score -= 1;

          this.tempList.splice(randomInd, 0, word)
          this.setValidators()
          break

        case 3:
          const tempScore = word?.tempLevel === 3 ? 2 : word?.tempLevel === 2 ? 1 : 0

          word = {
            ...word,
            level: word.level < 2 ? word.level + 1 : 2,
          }

          this.updateList.push(word)
          this.countUpWordsInThisDay += 1
          this.score += tempScore

          this.isWin()

          if (this.tempList.length > 0) {
            this.setValidators()
          }
          break
      }
    }
  }

  private equalsWords(){
    let word = ''

    switch (this.whatLesson) {
      case 1:
      case 3:
        word = this.tempList[0].englishWord.toLowerCase()
        break
      case 2:
        word = this.tempList[0].ukrainianTranslation.toLowerCase()
        break
      default:
    }
    if(word.split(',').length>1){
      this.resultSwitch = word.split(',').some(el=>  el.trim() === this.inputValue.trim().toLowerCase()) ? 3 : 1
    }
    else {
      this.resultSwitch = word === this.inputValue.trim().toLowerCase() ? 3 : 1
      this.resultSwitchBorder = this.resultSwitch === 3 ? 1 : 0
    }
  }

  getNavbarValue() {
    const x = this.tempList.length - 1
    return x ? 100 - (x * 5) : 100
  }

  speak(value: string) {
    this.speaker.speak(value)

  }

  speakSlowly(value: string) {
    this.speaker.speakSlowly(value,0.5)
  }

  deleteValue() {
    this.formControlText.reset()
    // this.formControlText.setValue('')
  }

  private extracted() {
    const lesson = this.router.url.split('/')[3]

    switch (lesson) {
      case 'lesson':
        this.whatLesson = 1
        break

      case 'translateEng':
        this.whatLesson = 2
        break

      case 'translateUa':
        this.whatLesson = 3
        break

      default:
        this.whatLesson = 1
    }
  }

  private getProgressOfDay(): TimeDay {

    const endTime = performance.now()
    const elapsedTimeInMillis = endTime - this.startTime
    const elapsedTimeInMinutes = Math.round(elapsedTimeInMillis / (1000 )) // Конвертуємо мілісекунди в sec


    return {
      date: getCurrentDate(),
      //date:'2023-07-18',
      countMin: elapsedTimeInMinutes,
      countUpWordsInThisDay: this.countUpWordsInThisDay,
      counterScore: this.score,
      detailForWordsProgress:this.getDetailProgress()
    }
  }

  private getDetailProgress(): DetailProgress {
    return this.updateList.reduce((item: DetailProgress, curr) => {
      switch (curr.tempLevel) {
        case 0:
        case 1:
          item['countLow'] += 1
          break
        case 2:
          item['countMiddle'] += 1
          break
        case 3:
          item['countHigh'] += 1
          break
      }
      return item
    }, {
      countHigh: 0,
      countMiddle: 0,
      countLow: 0
    })
  }

  private setValidators(): void {
    this.formControlText.setValidators(myValidator(this.tempList[0].englishWord))
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next()
    this.ngUnsubscribe$.complete()
  }



}
