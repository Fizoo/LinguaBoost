import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import { homePages } from 'src/assets/data/mainLayout/main';

import {FirebaseStorageService} from './firebase-storage.service'; // Переконайтеся, що імпортуєте правильно

interface HomePages {
  // Визначте ваш інтерфейс HomePages
}

@Injectable({
  providedIn: 'root'
})
export class CachedImgService implements OnInit {
  private homePages: HomePages[] = [];
  public homePageSubject$ = new Subject<HomePages[]>();

  constructor(private storage: FirebaseStorageService) {
    this.loadCachedData();
  }

  ngOnInit(): void {}

  private loadCachedData(): void {
    const storedData = localStorage.getItem('homePages');


    if (storedData ) {
      this.homePages = JSON.parse(storedData);
      this.homePageSubject$.next(this.homePages);
    } else {
      // Якщо localStorage порожній, тоді завантажте дані з FirebaseStorageService
      this.storage.getImgForMain().subscribe((data: string[]) => {
        this.homePages = homePages.map((page, i) => ({
          ...page,
          img: data[i],
        }));
        // Відправляємо оновлені дані через Subject
        this.homePageSubject$.next(this.homePages);
        this.setLocalStorage('homePages', this.homePages);
      });
    }
  }

  private setLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
