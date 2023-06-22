import {ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable, Subject, takeUntil, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {DataSelectorsWords} from "../../../store/data/selectors";
import {Theme} from "../../../models/data";

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FilterPageComponent implements OnDestroy{
  @Output() searchChange = new EventEmitter<string>();
  @Output() valueChanged = new EventEmitter<string>()
  private unsubscribe$=new Subject<void>();
  list$:Observable<Theme[]>
  id: number
  search: string = '';
  sortValue: string = '1'

  constructor(private router: Router,
            private  route: ActivatedRoute,
              private store:Store
              ) {

    route.params.pipe(
      map(el => el['id']),
      tap(id => this.id = id),
      takeUntil(this.unsubscribe$)
      ).subscribe()

   this.list$= this.store.select(DataSelectorsWords.getAllThemes)
  }

  onSearch() {
    this.searchChange.emit(this.search)
  }

  onSort(value: string) {
    this.valueChanged.emit(value)
  }

  writeEng(value: string) {
    this.router.navigate(['/theme', this.id, value, this.id])
    //routerLink="/theme/1/lesson/1"
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
