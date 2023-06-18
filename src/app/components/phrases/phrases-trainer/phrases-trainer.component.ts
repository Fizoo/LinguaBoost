import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Phrase} from "../../../models/data";
import {Store} from "@ngrx/store";
import {DataSelectors} from "../../../store/data/selectors";
import {SpeakerService} from "../../../services/speaker.service";

@Component({
  selector: 'app-phrases-trainer',
  templateUrl: './phrases-trainer.component.html',
  styleUrls: ['./phrases-trainer.component.scss']
})
export class PhrasesTrainerComponent implements OnInit, OnDestroy {
  id: number
  isVisible1 = false
  list: Phrase[] = []
  item: Phrase

  private unsubscribe$ = new Subject<void>();

  @HostListener('document:keydown.enter')
  onEnter() {
    this.nextTo()
  }

  constructor(private route: ActivatedRoute,
              private store: Store,
              private speaker: SpeakerService) {
    this.route.params
      .pipe(
        map(params => params['id']),
        tap(el=>console.log(el)),
        switchMap(id => this.store.select(DataSelectors.getPhrasesById(+id)).pipe(
        map(data => data.data)
        )),
        takeUntil(this.unsubscribe$)
      ).subscribe(data => {
      console.log(data)
      this.list = data
      this.item = data[this.getRandomIndex()]
    })

  }


  nextTo() {
    this.item = this.list[this.getRandomIndex()]
    this.speaker.speak(this.item.phrase)
    this.isVisible1 = false
  }

  speak(value:string):void{
    this.speaker.speak(value)
  }

  private getRandomIndex(): number {
    return Math.floor(Math.random() * this.list.length);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnInit(): void {
  }
}
