import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {BookActions} from "./store/book/actions";
import {catchError, filter, forkJoin, map, mergeMap, of, startWith, switchMap, take, tap, withLatestFrom} from "rxjs";
import {AudioStorageService} from "./services/audio-storage.service";
import {FirestoreService} from "./services/firestore.service";
import {Store} from "@ngrx/store";
import {BookSelectors} from "./store/book/selector";

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
              private storage: AudioStorageService,
              private firebase: FirestoreService,
              private store: Store
  ) {
  }

  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.initial), // Обробляємо тільки дії типу "initial"
      withLatestFrom(this.store.select(BookSelectors.getSelectIsFirstLoad)), // Отримуємо дані зі стора
      filter(([action, isFirstLoad]) => isFirstLoad), // Фільтруємо за умовою, що це перше завантаження
      switchMap(action =>
        this.firebase.getAllBooks().pipe(
          mergeMap((books) => {
            const modifiedBooks$ = books.map(book =>
              this.storage.getPosterById(book.id.toString()).pipe(
                map(urls => ({
                  ...book,
                  poster: urls[0]
                })),
              )
            ); // Підготовлюємо модифіковані дані для книг

            // Відправляємо декілька запитів паралельно і очікуємо їх завершення
            return forkJoin(modifiedBooks$).pipe(
              // Відправляємо дію з модифікованими даними після завершення всіх запитів
              map(modifiedBooks => BookActions.addAllBooks({data: modifiedBooks})),
              catchError(error => {
                console.error('Error loading books:', error);
                // Відправляємо дію з помилкою завантаження в разі виникнення помилки
                return of(BookActions.loadBooksFailure({error}));
              }),
               tap(() => this.store.dispatch(BookActions.loadBooksSuccess())) // Відправляємо дію успішного завантаження
            )
          }),
          startWith(BookActions.loadBooksInProgress()), // Відправляємо дію процесу завантаження на початку ефекту
        )
      ),
    )
  );

  loadAudioForBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.initialLoadAudioForBookById),
      switchMap(({bookName}) => {
        return this.store.select(BookSelectors.hasAudioForBooks(bookName)).pipe(
          take(1),
          filter(hasAudio => !hasAudio),
          switchMap(() =>
            this.storage.getAudioUrlsByBookId(bookName).pipe(
              map((urlArr) => BookActions.loadAudioForBookById({ urlArr: urlArr, name: bookName })),
              catchError(error => {
                console.error('Error loading audio for book:', error);
                return of(BookActions.loadBooksFailure({ error }));
              })
            )
          )
        );
      })
    )
  );


  /*  loadAllBooks$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BookActions.initial),
        switchMap(action =>
          this.firebase.getAllBooks()
            .pipe(
              mergeMap((books: Book[]) =>
                this.processBooks(books)
              ),
              map(data => BookActions.addAllBooks({data}))
            )
        )
      )
    )*/

/*  private processBooks(books: Book[]): Observable<Book[]> {
    const processedBooks$: Observable<Book>[] = books.map(book =>
      zip(
        this.storage.getPosterById(book.id.toString()),
        this.storage.getAudioUrlsByBookId(book.book_title)
      ).pipe(
        map(([poster, audioUrls]) => {
          const modifiedChapters = book.chapters.map((chapter, i) => ({
            ...chapter,
            audioUrl: audioUrls[i]
          }));

          return {
            ...book,
            poster: poster[0],
            chapters: modifiedChapters
          };
        })
      )
    );

    return forkJoin(processedBooks$);
  }*/
}
