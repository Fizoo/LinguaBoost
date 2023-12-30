import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HomePages} from "../../../assets/data/mainLayout/main";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {

  homePages: HomePages[]

  constructor() {
    const storedData = localStorage.getItem('homePages');
    if (storedData) {
      this.homePages = JSON.parse(storedData);

    }
  }
}
