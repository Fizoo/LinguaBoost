import {Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, map, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Phrase} from "../../../models/data";
import {Store} from "@ngrx/store";
import {Speaker2Service} from "../../../services/speaker3.service";
import {DataSelectorsPhrases} from "../../../store/data/selectors-phrases";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-phrases-trainer',
  templateUrl: './phrases-trainer.component.html',
  styleUrls: ['./phrases-trainer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhrasesTrainerComponent implements OnDestroy,OnInit {
  id: number
  isVisible:boolean
  isVisible1 = false
  mainVisible :boolean
  list: Phrase[] = []
  item: Phrase
  randomArr:Array<number> =[]
  phrase:string=''

  private unsubscribe$ = new Subject<void>();
  inputValue=new FormControl
  isCheck=false
  isResultEqual:boolean

  @HostListener('document:keydown.enter')
  onEnter() {
    this.nextTo()
  }

  constructor(private route: ActivatedRoute,
              private router:Router,
              private store: Store,
              private speaker: Speaker2Service) {

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
        map(data => data.data),
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

  ngOnInit() {
    this.inputValue.valueChanges.pipe(
      debounceTime(300),
      tap(el=>this.phrase=el),
      takeUntil(this.unsubscribe$)
    ).subscribe()
  }


  nextTo() {
    this.item = this.list[this.getRandomIndex()]
    this.speaker.speak(this.item.phrase)
    this.isVisible1 = false
    this.isVisible=this.mainVisible
  }

  check() {
    this.isCheck=true
    this.isResultEqual=this.phrase.toLowerCase()===this.item.phrase.toLowerCase()
  }

  speak(value:string):void{
    this.speaker.speak(value)
  }

  closeLesson() {
    this.router.navigate(['phrases',0],)
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
