import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import {Words} from "../../models/data";
import {map, switchMap, tap} from "rxjs";
import {ActivatedRoute} from '@angular/router';
import {Store} from "@ngrx/store";
import {DataSelectors} from "../../store/data/selectors";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class ContentComponent implements OnInit {
  list: Words[]
  searchText: string = ''

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private store:Store
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
     /* tap(el => console.log('id=', el['id'])),*/
      /*switchMap((params) => {
        const id = params['id']
        return this.dataService.data$.pipe(
          map((themes) => {
            const theme = themes.data.find(t => t.id === id)
            return theme ? theme.data : []
          }))
      })*/
      map(el=>el['id']),
      tap(el => console.log(el)),
      switchMap(id=>this.store.select(DataSelectors.getThemeById('1')).pipe(
        tap(el=>console.log(el))
      ))
    ).subscribe((list) => this.list = list.data)

  }


  trackByFn(index: number, item: Words) {
    return item.id
  }

  onSearch(searchText: string) {
    this.searchText = searchText
  }
}
