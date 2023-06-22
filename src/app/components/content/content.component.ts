import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import {Words} from "../../models/data";
import {map, switchMap} from "rxjs";
import {ActivatedRoute} from '@angular/router';
import {Store} from "@ngrx/store";
import {DataSelectorsWords} from "../../store/data/selectors";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ContentComponent implements OnInit {
  list: Words[] = []
  searchText: string = ''

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private store: Store
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(el => el['id']),
      switchMap(id => this.store.select(DataSelectorsWords.getThemeById(id)).pipe(
      ))
    ).subscribe((list) => this.list = list.data)

  }


  trackByFn(index: number, item: Words) {
    return item.id
  }

  onSearch(searchText: string) {
    this.searchText = searchText
  }

  onSorting(value: string) {
    switch (value) {
      case '1':
        this.list = [...this.list].sort((a, b) => a.englishWord.localeCompare(b.englishWord))
        break
      case '2':
        this.list = [...this.list].sort((a, b) => b.englishWord.localeCompare(a.englishWord))
        break
      case '3':
        this.list = [...this.list].sort((a, b) => {
        let res=a.level - b.level
          if(res!==0) return res
          return  a.englishWord.localeCompare(b.englishWord)
        })
        break
      case '4':
        this.list = [...this.list].sort((a, b) => {
          let res=b.level - a.level
          if(res!==0) return res
          return  a.englishWord.localeCompare(b.englishWord)
        })
        break
      case '5':
        this.list = [...this.list].sort(() => Math.random() - 0.5)
        break
      default:
        break;
    }
  }

}
