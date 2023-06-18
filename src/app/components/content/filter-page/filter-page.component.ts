import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable, take, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {DataSelectors} from "../../../store/data/selectors";
import {Theme} from "../../../models/data";

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FilterPageComponent {
  @Output() searchChange = new EventEmitter<string>();
  @Output() valueChanged = new EventEmitter<string>()
  list$:Observable<Theme[]>
  id: number
  search: string = '';
  sortValue: string = '1'

  constructor(private router: Router,
            private  route: ActivatedRoute,
              private store:Store
              ) {

    route.params.pipe(take(1),
      map(el => el['id']),
      tap(id => this.id = id)).subscribe()

   this.list$= this.store.select(DataSelectors.getAllThemes)
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

}
