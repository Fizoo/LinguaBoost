import {Component, HostListener, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, Subject, switchMap, takeUntil} from "rxjs";
import {Phrase} from "../../../models/data";
import {Store} from "@ngrx/store";
import {SpeakerService} from "../../../services/speaker.service";
import {DataSelectorsPhrases} from "../../../store/data/selectors-phrases";

@Component({
  selector: 'app-phrases-trainer',
  templateUrl: './phrases-trainer.component.html',
  styleUrls: ['./phrases-trainer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhrasesTrainerComponent implements OnDestroy {
  id: number
  isVisible:boolean
  isVisible1 = false
  mainVisible :boolean
  list: Phrase[] = []
  item: Phrase
  randomArr:Array<number> =[]

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
        switchMap((id) => this.route.queryParams.pipe(
          map(queryParams => ({
            id: id,
            query: queryParams['query']
          }))
        )),
        switchMap(({id,query}) => this.store.select(DataSelectorsPhrases.getPhrasesById(+id,query)).pipe(
        map(data => data.data)
        )),
        takeUntil(this.unsubscribe$)
      ).subscribe(data => {
      this.list = data
      this.item = data[this.getRandomIndex()]
    })

    this.route.queryParams.pipe(
      map(queryParams =>queryParams['visible']),
      map(el=>el==='true'),
      takeUntil(this.unsubscribe$)
    ).subscribe(response=> {
      this.isVisible = response
      this.mainVisible=response

    })

  }


  nextTo() {
    this.item = this.list[this.getRandomIndex()]
    this.speaker.speak(this.item.phrase)
    this.isVisible1 = false
    this.isVisible=this.mainVisible
  }

  speak(value:string):void{
    this.speaker.speak(value)
  }

  private getRandomIndex(): number {
    if (this.randomArr.length === 0) {
      this.randomArr = Array.from(Array(this.list.length).keys());
    }

    const randomIndex = Math.floor(Math.random() * this.randomArr.length);
    const index = this.randomArr[randomIndex];

    // Видалення випадкового індексу з масиву
    this.randomArr.splice(randomIndex, 1);

    return index;

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
