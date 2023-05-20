import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject, debounceTime, map, switchMap, tap} from "rxjs";
import {DataService} from 'src/app/services/data.service';
import {myValidator} from "../../helper/my.validators";
import {Words} from "../../models/data";
import {SpeakerService} from "../../services/speaker.service";

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
export class LessonComponent implements OnInit {
  currentWord$ = new BehaviorSubject<string>('')
  data: Words[]
  tempList: Words[] = []
  //index=0
  inputValue: string = ''
  formControlValue: FormControl = new FormControl('', myValidator(''))

  instructionForLesson = 1
  isBuilderWords = false
  isAudioChallenge = true
  isProgressBar = false
  isFooterHide = true
  resultSwitch = 3
  isCheckingBtnDisabled = false
  isWinChallenge = false

  isHideSpanInAnswer = true

  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private speaker: SpeakerService,
              private router: Router
  ) {
  }

  ngOnInit(): void {

    this.route.params.pipe(
      map(el => el['id']),
      switchMap(id => this.dataService.data$
        .pipe(map(el => el.data.filter(s => s.id === id)[0].data),
        )),
    ).subscribe((data) => {
      this.data = data
      this.tempList = this.randomList()
      this.formControlValue.setValidators(myValidator(this.tempList[0].englishWord))
      this.setVariables(1)

    })

    this.formControlValue.valueChanges.pipe(
      debounceTime(300),
      tap(el => {
        this.inputValue = el ?? ''
        this.isCheckingBtnDisabled = !!el
      })).subscribe()
  }

  checking() {
    this.isFooterHide = false
    this.isWinChallenge = true

    let x = this.tempList[0].englishWord
    if (x === this.inputValue) {
      this.resultSwitch = 3
      this.tempList.shift()
    } else {
      let y = this.tempList.shift()
      if (y) {
        this.tempList.push(y)
      }
      this.resultSwitch = 1
    }

  }

  nextTo() {
    let x = this.tempList.shift()
    this.win()
    if (this.tempList.length > 0) {
      this.isFooterHide = true
      this.isWinChallenge = false
      this.deleteValue()
      this.formControlValue.setValidators(myValidator(this.tempList[0].englishWord))
    }
  }

  lossChallenge() {
    this.resultSwitch = 2
    this.isFooterHide = false
    this.isWinChallenge = true
  }

  speak(value: string): void {
    this.isProgressBar = !this.isProgressBar
    setTimeout(() => this.isProgressBar = !this.isProgressBar, 1500)
    this.speaker.speak(value)
  }

  deleteValue() {
    this.formControlValue.setValue('')
  }

  public getNavbarValue(): number {
    let x = this.tempList.length - 1
    return x ? 100 - (x * 5) : 100
  }

  public win(): void {
    if (this.tempList.length === 0) {
      this.router.navigate(['theme/1/lesson/1/result/goal'])
    }
  }

  private randomInd(): number[] {
    const list: number[] = [];
    const dataLength = this.data.length;
    while (list.length < 20) {
      const x = Math.floor(Math.random() * dataLength);
      if (!list.includes(x)) {
        list.push(x);
      }
    }
    return list;
  }

  randomList(): Words[] {
    let arr: Words[] = []
    this.randomInd().forEach(ind => arr.push(this.data[ind]))
    return arr
  }

  private setVariables(value: number) {
    switch (value) {
      case 1:
        this.instructionForLesson = 1
        this.isAudioChallenge = true
        this.isBuilderWords = false
        break

      case 2:
        this.instructionForLesson = 2
        this.isAudioChallenge = false
        this.isBuilderWords = false
        break

      case 3:
        this.instructionForLesson = 3
        this.isAudioChallenge = false
        this.isBuilderWords = false
        break
      case 4:
        this.instructionForLesson = 4
        this.isAudioChallenge = false
        this.isBuilderWords = true
        break

      default:
        this.instructionForLesson = 0
        this.isAudioChallenge = true
        this.isBuilderWords = false
    }
  }

  private setValidators():void{
    this.formControlValue.setValidators(myValidator(this.tempList[0].ukrainianTranslation))
  }

}
