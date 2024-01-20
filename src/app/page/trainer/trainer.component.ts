import {Component, HostListener} from '@angular/core';
import {Words} from "../../models/data";
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap, take} from "rxjs";
import {Store} from "@ngrx/store";
import {DataSelectorsWords} from "../../store/data/selectors";
import {SpeakerService} from "../../services/speaker.service";

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss']
})
export class TrainerComponent {
  list: Words[] = []
  item: Words
  isTranslateWord = false
  isSentence = false
  indexArr:Array<number> =[]

  @HostListener('document:keydown.enter')
  onEnter() {
    this.nextTo()
  }

  constructor(private speaker: SpeakerService,
              private route: ActivatedRoute,
              private store: Store,
              private router:Router
  ) {
    this.route.params.pipe(
      take(1),
      map(params => params['id']),
      switchMap(id => store.select(DataSelectorsWords.getThemeById(id)))
    ).subscribe(({data}) => {
      if(data) {
        this.list = data
        this.item = data[this.getRandomIndex()]
      }
      else {
       this.router.navigate(['/'])
      }
    })
  }


  nextTo() {
    this.item = this.list[this.getRandomIndex()]
    this.isTranslateWord = false
    this.isSentence = false
    this.speak(this.item.englishWord)
  }

  speak(value: string) {
    this.speaker.speak(value)
  }

  speakSlowly(value: string) {
    this.speaker.speakSlowly(value)
  }

  private getRandomIndex(): number {
    if (this.indexArr.length === 0) {
      this.indexArr = Array.from(Array(this.list.length).keys());
    }

    const randomIndex = Math.floor(Math.random() * this.indexArr.length);
    const index = this.indexArr[randomIndex];

    // Видалення випадкового індексу з масиву
   this.indexArr.splice(randomIndex, 1);

    return index;
  }

}
