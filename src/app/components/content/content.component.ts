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
  navigateList: Words[] = []
  tempList: Words[] = []

  searchText: string = ''
  isLoading$: Observable<boolean>
  isError$: Observable<any>

  currentPageSize: number = 25;
  currentPageIndex: number = 0;


  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private store: Store
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(el => el['id']),
      switchMap(id => +id !== -1
        ? this.store.select(DataSelectorsWords.getThemeById(id))
        : this.store.select(DataSelectorsWords.combineAllWords)
      ),
    ).subscribe(({data}) => {

      if (data) {
        this.list = data
        this.navigateList = data
        this.tempList = data

        this.onPageChange({
          pageIndex: 0,
          pageSize: 25,
          length: data.length
        })
      }
    })

    this.isLoading$ = this.store.select(DataSelectorsWords.isLoadingData)
    this.isError$ = this.store.select(DataSelectorsWords.isErrorLoadData)
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
      case '2':
        this.tempList=this.sortByNameAndPaginate([...this.list],value)

        this.onPageChange({
          pageIndex: this.currentPageIndex,
          pageSize: this.currentPageSize,
          length: this.list.length // Оновлюємо довжину списку
        });
        break
      case '3':
      case '4':
        this.tempList=this.sortByLevelAndPaginate([...this.list],value)
        this.onPageChange({
          pageIndex: this.currentPageIndex,
          pageSize: this.currentPageSize,
          length: this.list.length // Оновлюємо довжину списку
        });
        break
      case '5':
        this.tempList = [...this.list].sort(() => Math.random() - 0.5)

        this.onPageChange({
          pageIndex: this.currentPageIndex,
          pageSize: this.currentPageSize,
          length: this.list.length // Оновлюємо довжину списку
        });
        break


      default:
        break;
    }

  }

  sortByNameAndPaginate(arr: Words[], value: string):Words[]{
    //this.navigateList=sortedList
    return arr.sort((a, b) => {
      return value === '1' ? a.englishWord.localeCompare(b.englishWord) : b.englishWord.localeCompare(a.englishWord)
    })
  }

  private sortByLevelAndPaginate(arr: Words[], value: string): Words[] {
    return arr.sort((a, b) => {
      const res = value === '3' ? a.level - b.level : b.level - a.level;
      if (res !== 0) return res;
      return a.englishWord.localeCompare(b.englishWord);
    })
  }

  onPageChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.currentPageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.navigateList = this.tempList.slice(startIndex, endIndex);
  }
}
