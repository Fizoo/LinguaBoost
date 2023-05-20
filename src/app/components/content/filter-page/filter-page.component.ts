import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, take, tap} from "rxjs";

@Component({
  selector: 'app-filter-page',
  templateUrl: './filter-page.component.html',
  styleUrls: ['./filter-page.component.scss']
})
export class FilterPageComponent {
  @Output() searchChange = new EventEmitter<string>();
  id: number
  search: string = '';

  constructor(private router: Router,
              route: ActivatedRoute) {
    route.params.pipe(take(1),
      map(el => el['id']),
      tap(id => this.id = id)).subscribe()

  }



  onSearch() {
    this.searchChange.emit(this.search);
  }

  writeEng(value: string) {
    this.router.navigate(['theme',this.id,value,this.id])
    //routerLink="/theme/1/lesson/1"
  }
}
