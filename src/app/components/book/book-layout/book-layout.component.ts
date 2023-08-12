import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../../models/book";
import {SpeakerService} from "../../../services/speaker.service";
import {FormControl} from "@angular/forms";
import {first, Subject, takeUntil} from "rxjs";
import {AudioStorageService} from "../../../services/audio-storage.service";
import {SafeResourceUrl} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {BookSelectors} from "../../../store/book/selector";


@Component({
  selector: 'app-book-layout',
  templateUrl: './book-layout.component.html',
  styleUrls: ['./book-layout.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BookLayoutComponent implements OnInit,OnDestroy {
  book: Book
  copyBook: Book

  bookControl = new FormControl()
  voiceControl = new FormControl()

  listAudio: string[] = []
  currentChapter: number = -1
  isAdder:boolean=false

   private unsubscribe$=new Subject<void>();

  constructor(private speak: SpeakerService,
              private audioStorageService: AudioStorageService,
              private store:Store
  ) {
  }

  ngOnInit(): void {
    this.copyBook = this.book

    this.store.select(BookSelectors.getBookById(1)).subscribe(data=>{
      this.book=data
      this.copyBook = data
    })


    this.audioStorageService.getAudioUrlsByBookId('The Adventures of Tom Sawyer').pipe(first())
      .subscribe((url:SafeResourceUrl[]) => {
        this.listAudio=[...url ] as string[]
      });

    this.bookControl.valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((el) => {
      this.currentChapter=el.id

      this.copyBook =el.id? {
        ...this.book,
        chapters: this.book.chapters.filter(a => a.id === el.id)
      }:this.book
    })
  }


  speaker(value: string) {
    this.speak.speak(value)
  }

  adder() {
    this.isAdder = !this.isAdder
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
