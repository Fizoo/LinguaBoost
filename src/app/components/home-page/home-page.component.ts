import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HomePages} from "../../../assets/data/mainLayout/main";
import {CachedImgService} from "../../services/cached-img.service";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnInit{

  homePages: HomePages[]

  constructor(private cache:CachedImgService) {
  }

  ngOnInit(): void {
     const storedData = localStorage.getItem('homePages');
  if (storedData) {
    this.homePages = JSON.parse(storedData);

  }
  }
}
