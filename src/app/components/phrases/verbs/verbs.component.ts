import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, Subject, switchMap, takeUntil, tap} from "rxjs";
import {Phrase, TopicPhrases} from "../../../models/data";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from '@angular/router';
import {DataSelectorsPhrases} from "../../../store/data/selectors-phrases";
import {PageEvent} from "@angular/material/paginator";
import {SpeakerService} from "../../../services/speaker.service";

@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.component.html',
  styleUrls: ['./verbs.component.scss']

})
export class VerbsComponent implements OnInit, OnDestroy {
  listPhrases$:Observable<TopicPhrases[]>

  search: string = ''
  formSort = new FormControl<string>('')

  listPhrases: Phrase[] = []
  copyListPhrase: Phrase[] = []
  tempListPhrase: Phrase[] = []

  currentPageSize: number = 25;
  currentPageIndex: number = 0;

  currentId: number

  private unSubscribe$ = new Subject<void>()

  constructor(private store: Store,
              private route: ActivatedRoute,
              private speaker: SpeakerService,
              private router: Router) {}

  ngOnInit(): void {

    this.route.params.pipe(
      map(params => params['id']),
      tap(id => this.currentId = id),
      switchMap((id) => this.route.queryParams.pipe(
        map(queryParams => ({
          id: id,
          query: queryParams['query']
        }))
      )),
      switchMap(({id, query}) => this.store.select(DataSelectorsPhrases.getPhrasesById(+id, query))),
      takeUntil(this.unSubscribe$)
    ).subscribe(({data}) => {

      this.listPhrases = data
      this.copyListPhrase = data
      this.tempListPhrase = data

      this.onPageChange({
        pageIndex: 0,
        pageSize: 25,
        length: data.length
      })

    });

    this.formSort.valueChanges.pipe(
      takeUntil(this.unSubscribe$),
    ).subscribe((value) => {
      if (value) {
        this.copyListPhrase = this.sortFn(value)
        this.tempListPhrase = this.sortFn(value)

       this.onPageChange({
          pageIndex: this.currentPageIndex,
          pageSize: this.currentPageSize,
          length: this.tempListPhrase.length // Оновлюємо довжину списку
        });
      }
    })

    this.listPhrases$=this.store.select(DataSelectorsPhrases.getAllDataOfPhrases)
  }

  sortFn(value: string): Phrase[] {
    let tempList = [...this.copyListPhrase]
    let filteredData = tempList.filter((el) => el.isFavorite);

    switch (value) {
      case 'up':
        tempList.sort((a, b) => a.phrase.localeCompare(b.phrase))
        break
      case 'down':
        tempList.sort((a, b) => b.phrase.localeCompare(a.phrase))
        break
      case 'random':
        tempList.sort(() => Math.random() - 0.5)
        break

      case 'favorite':
        return filteredData;

      default :
        break
    }
    return tempList
  }

  onPageChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.currentPageSize = event.pageSize;

    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;

    this.copyListPhrase = this.tempListPhrase.slice(startIndex, endIndex);

  }

  trackByFn(index: number, item: Phrase) {
    return item.id
  }


  speak(value: string) {
    this.speaker.speak(value)
  }

  leanFn(value: string): void {
    this.router.navigate(['phrases', this.currentId, 'trainer', this.currentId], {
      queryParams: {visible: value}
    })
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next()
    this.unSubscribe$.complete()
  }


}
