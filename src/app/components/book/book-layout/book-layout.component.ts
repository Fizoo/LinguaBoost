import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../../models/book";
import {SpeakerService} from "../../../services/speaker.service";
import {FormControl} from "@angular/forms";
import {map, Subject, switchMap, takeUntil} from "rxjs";
import {AudioStorageService} from "../../../services/audio-storage.service";
import {Store} from "@ngrx/store";
import {BookSelectors} from "../../../store/book/selector";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-book-layout',
  templateUrl: './book-layout.component.html',
  styleUrls: ['./book-layout.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BookLayoutComponent implements OnInit,OnDestroy {
  book: Book
  copyBook: Book
  voices:Array<SpeechSynthesisVoice> =[]

  bookControl = new FormControl()
  voiceControl = new FormControl()

  currentChapter: number = -1
  isAdder:boolean=false

   private unsubscribe$=new Subject<void>();

  constructor(private speak: SpeakerService,
              private audioStorageService: AudioStorageService,
              private store:Store,
              private route:ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.copyBook = this.book

    this.route.params
      .pipe(
        map(params => params['id']),
        takeUntil(this.unsubscribe$),
        switchMap(({id})=>this.store.select(BookSelectors.getBookById(1)))
      ).subscribe(response=>{
        this.book=response
        this.copyBook=response
    })

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



  stopSpeaker() {
    this.speak.stop()
  }

  setVoices(voice: number) {
    this.speak.setVoice(voice)
  }

  getAllVoices() {
    this.voices= this.speak.getVoice()
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
