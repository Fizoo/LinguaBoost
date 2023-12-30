import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {HomePages} from "../../assets/data/mainLayout/main";
import {FirebaseStorageService} from "./firebase-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CachedImgService {
  private homePages: HomePages[] = [];
  private homePageSubject$: Subject<HomePages[]> = new Subject<HomePages[]>();

  constructor(private storage:FirebaseStorageService) {
    this.storage.getImgForMain().subscribe((data: string[]) => {
      this.homePages = this.homePages.map((page, i) => ({
        ...page,
        img: data[i],
      }));
      // Відправляємо оновлені дані через Subject
      this.homePageSubject$.next(this.homePages);
    });
  }
}
