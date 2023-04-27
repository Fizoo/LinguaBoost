import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import {Data, Words} from "../../models/data";
import {filter, map, Observable, switchMap, tap} from "rxjs";
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']

})
export class ContentComponent implements OnInit {
  list: Words[]
  searchText: string = ''

  constructor(private dataService: DataService,
              private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      tap(el => console.log('id=', el['id'])),
      switchMap((params) => {
        const id = params['id']
        return this.dataService.data$.pipe(
          map((themes) => {
            const theme = themes.data.find(t => t.id === id)
            return theme ? theme.data : []
          }))
      })
    ).subscribe((list) => this.list = list)

  }


  trackByFn(index: number, item: Words) {
    return item.id
  }

  onSearch(searchText: string) {
    this.searchText = searchText

  }
}
