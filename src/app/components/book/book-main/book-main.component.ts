import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AudioStorageService} from "../../../services/audio-storage.service";
import {Store} from "@ngrx/store";
import {Book} from "../../../models/book";
import {BookSelectors} from "../../../store/book/selector";
import {BookActions} from "../../../store/book/actions";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

interface Genre {
  genre:string
}
interface Level {
  level:string
}

@Component({
  selector: 'app-book-main',
  templateUrl: './book-main.component.html',
  styleUrls: ['./book-main.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BookMainComponent implements OnInit {
  searchValue: string = ''
  listBook$: Observable<Book[]>
  listGenres$: Observable<Genre[]>
  listLevels$: Observable<Level[]>

  selectedGenre:string=''
  selectedLevel:string=''
  isMenu=true

  constructor(private storage: AudioStorageService,
              private changeDetectorRef: ChangeDetectorRef,
              private store: Store,
              private router:Router
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(BookActions.initial())
    this.listBook$ = this.store.select(BookSelectors.getAllBooks)
    this.listGenres$=this.store.select(BookSelectors.getListGenres)
    this.listLevels$=this.store.select(BookSelectors.getListLevels)
  }

  selectBook(book: Book) {
    this.store.dispatch(BookActions.initialLoadAudioForBookById({bookName: book.book_title}))
    this.router.navigate(['book',book.id])
  }
}
