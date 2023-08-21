import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import {Words} from "../../models/data";
import {map, Observable, switchMap} from "rxjs";
import {ActivatedRoute} from '@angular/router';
import {Store} from "@ngrx/store";
import {DataSelectorsWords} from "../../store/data/selectors";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ContentComponent implements OnInit {
  list: Words[] = []
  copyList: Words[] = []
  searchText: string = ''
  isLoading$:Observable<boolean>
  isError$:Observable<any>


  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private store: Store
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(el => el['id']),
      switchMap(id => +id!==-1
        ?this.store.select(DataSelectorsWords.getThemeById(id))
        : this.store.select(DataSelectorsWords.combineAllWords)
       ),
    ).subscribe((list) => {
      this.list = list.data
      this.copyList = list.data


      this.onPageChange({
        pageIndex: 0,
        pageSize: 25,
        length:list.data.length
      });

    })

    this.isLoading$=this.store.select(DataSelectorsWords.isLoadingData)
    this.isError$=this.store.select(DataSelectorsWords.isErrorLoadData)


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
        this.copyList = [...this.list].sort((a, b) => a.englishWord.localeCompare(b.englishWord))
        break
      case '2':
        this.copyList = [...this.list].sort((a, b) => b.englishWord.localeCompare(a.englishWord))
        break
      case '3':
        this.copyList = [...this.list].sort((a, b) => {
        let res=a.level - b.level
          if(res!==0) return res
          return  a.englishWord.localeCompare(b.englishWord)
        })
        break
      case '4':
        this.copyList = [...this.list].sort((a, b) => {
          let res=b.level - a.level
          if(res!==0) return res
          return  a.englishWord.localeCompare(b.englishWord)
        })
        break
      case '5':
        this.copyList = [...this.list].sort(() => Math.random() - 0.5)
        break
      default:
        break;
    }
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;

    this.copyList = this.list.slice(startIndex, endIndex);

  }
}
