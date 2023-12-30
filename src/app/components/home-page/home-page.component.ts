import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AudioStorageService} from "../../services/audio-storage.service";

import {Subject} from "rxjs";
import {homePages, HomePages} from "../../../assets/data/mainLayout/main";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {

  homePage$: Subject<HomePages[]> = new Subject<HomePages[]>();
  homePages:HomePages[]=homePages

  constructor(private storage:AudioStorageService) {
    this.storage.getImgForMain().subscribe((data: string[]) => {
      this.homePages = this.homePages.map((page, i) => ({
        ...page,
        img: data[i],
      }));

      // Відправляємо оновлені дані через Subject
      this.homePage$.next(this.homePages);
    });


  }


}
