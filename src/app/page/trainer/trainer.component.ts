import {Component, HostListener} from '@angular/core';
import {SpeakerService} from "../../services/speaker.service";
import {Words} from "../../models/data";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, take} from "rxjs";
import {Store} from "@ngrx/store";
import {DataSelectors} from "../../store/data/selectors";

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

  @HostListener('document:keydown.enter')
  onEnter() {
    this.nextTo()
  }

  constructor(private speaker: SpeakerService,
              private route: ActivatedRoute,
              private store: Store
  ) {
    this.route.params.pipe(
      take(1),
      map(params => params['id']),
      switchMap(id => store.select(DataSelectors.getThemeById(id)).pipe(
        map(data => data.data)
      ))
    ).subscribe(data => {
      this.list = data
      this.item = data[this.getRandomIndex()]
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

  private getRandomIndex(): number {
    return Math.floor(Math.random() * this.list.length);
  }

}
