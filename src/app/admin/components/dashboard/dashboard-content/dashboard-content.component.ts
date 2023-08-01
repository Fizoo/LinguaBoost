import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, Subject, switchMap, takeUntil} from "rxjs";
import {DataSelectorsWords} from "../../../../store/data/selectors";
import {CollectTopic, CollectTopicItem} from "../../../../models/data";
import {DataActions} from "../../../../store/data/actions";

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss'],

})
export class DashboardContentComponent implements OnInit, OnDestroy {
  @Input() listThemes: CollectTopic[] | null = []
  searchText: string = ''

  list: CollectTopicItem[] = []
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private store: Store) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['id']),
      map(id => {
        const type = this.route.snapshot.url[0].path
        return {id, type}
      }),
      switchMap(({id, type}) => this.store.select(DataSelectorsWords.getListForDashboard(id, type))),
      takeUntil(this.unsubscribe$)
    ).subscribe(data => {
      this.list = data.data
    })
  }

  onSearch(value: string) {
    this.searchText = value
  }

  trackByFn(index: number, item: CollectTopicItem) {
    return item.id
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }


  deleteItem(item: CollectTopicItem) {
    this.store.dispatch(DataActions.deleteItemWithTopicById({item}))
  }

  onSort(value: string) {
    this.list = [...this.list].sort((a, b) => value === '1' ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
  }
}
