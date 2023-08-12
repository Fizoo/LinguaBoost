import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, forkJoin, from, map, Observable, switchMap} from "rxjs";

import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class AudioStorageService {

  constructor(private storage:AngularFireStorage,
              private sanitizer: DomSanitizer) { }

  // Завантажити аудіофайл до Firebase Cloud Storage
  uploadAudioFile(bookId: string,file: File, fileName: string): Observable<any> {
    const filePath = `books/${bookId}/${fileName}`
    const ref = this.storage.ref(filePath)
    const task = ref.put(file)

    return task.snapshotChanges().pipe(
      // Очікуємо завершення завантаження
      finalize(() => {
        // Отримуємо URL файлу після завершення завантаження

        return ref.getDownloadURL()
      })
    );
  }

  getAudioUrlsByBookId(bookId: string): Observable<SafeResourceUrl[]> {
    const storageRef = this.storage.ref(`books/${bookId}`);

    return storageRef.listAll().pipe(
      switchMap(result => {
        const observables: Observable<SafeResourceUrl>[] = [];
        result.items.forEach(item => {
          observables.push(
            from(item.getDownloadURL()).pipe(
              map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url)),
              map((el:any)=>el.changingThisBreaksApplicationSecurity.toString()),
            )
          );
        });
        return forkJoin(observables);
      }),


    );
  }
/*
  getAudioUrlsByBookId(bookId: string): Observable<string[]> {
    const storageRef = this.storage.ref(`books/${bookId}`);

    return storageRef.listAll().pipe(
      switchMap(result => {
        const observables: Observable<string>[] = [];
        result.items.forEach(item => {
          observables.push(new Observable<string>(observer => {
            item.getDownloadURL().then(url => {
              observer.next(url);
              observer.complete();
            }).catch(error => {
              observer.error(error);
            });
          }));
        });
        return forkJoin(observables);
      })
    );
  }*/
}
