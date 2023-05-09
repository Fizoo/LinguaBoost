import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Words} from "../../models/data";
import {FormControl} from "@angular/forms";
import {myValidator} from "../../helper/my.validators";
import {SpeakerService} from "../../services/speaker.service";
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {DataSelectors} from "../../store/data/selectors";

@Component({
  selector: 'app-lesson-write-by-eng',
  templateUrl: './lesson-write-by-eng.component.html',
  styleUrls: ['./lesson-write-by-eng.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LessonWriteByEngComponent implements OnInit {
  tempList: Words[] = []
  mainlist: Words[]=[]
  isProgressBar = false
  isFooterHide = true
  isWinChallenge = false
  isCheckingBtnDisabled = false
  resultSwitch = 1
  isHideSpanInAnswer = true
  inputValue: string = ''
  id: string
  formControlText: FormControl = new FormControl('', myValidator(''))

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
          console.log('dara',data)
          this.tempList = data
          this.mainlist = data
          this.formControlText.setValidators(myValidator(data[0].englishWord))
        })
      ))
    ).subscribe()

    this.formControlText.valueChanges.pipe(
      map(el=>el?.trim()),
      tap(value => {
        this.inputValue = value
        this.isCheckingBtnDisabled = !!value
      })
    ).subscribe()
  }

  checking() {
    this.isFooterHide = false
    this.isWinChallenge = true

    const word = this.tempList[0].englishWord
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
    console.log(this.mainlist)
    if (this.tempList.length === 0) {
      this.router.navigate(['theme/1/lesson/1/result/goal'])
    }
    console.log(this.mainlist)
  }

  private audit(value: number): void {

    let word = this.tempList.shift()

    if (word) {
      switch (value) {
        case 1:
          word={...word,
            level:word.level>1?word.level-1:1}
          this.tempList.push(word)
          this.formControlText.setValidators(myValidator(this.tempList[0].englishWord))
          break
        case 2:
          this.tempList.push(word)
          this.formControlText.setValidators(myValidator(this.tempList[0].englishWord))
          break
        case 3:
         /* this.list = this.list.map(el => el.id === word?.id ? ({
              ...el,
              level: el.level < 3 ? el.level + 1 : 3
            }) : el
          )*/

          this.isWin()
          break
      }
    }
  }


}
