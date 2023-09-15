import {Component} from '@angular/core';

export class Area {
  country: string;
  area: number;
}
@Component({
  selector: 'app-statist',
  templateUrl: './statist.component.html',
  styleUrls: ['./statist.component.scss']
})
export class StatistComponent {
areas: Area[] = [{
    country: 'Top',
    area: 2,
  }, {
    country: 'Middle',
    area: 5,
  }, {
    country: 'Low',
    area: 200,
  }];
}
