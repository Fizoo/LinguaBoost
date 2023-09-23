import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {DataSelectorsWords} from "../../store/data/selectors";
import {ProgressSelectors} from "../../store/progress/selectors";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {Diagram, StatisticData, TimeDayDiagram} from "../../models/statictic";


@Component({
  selector: 'app-statist',
  templateUrl: './statist.component.html',
  styleUrls: ['./statist.component.scss']
})
export class StatistComponent implements OnInit {
  allWords$: Observable<number>
  countHigh$: Observable<number>
  countMiddle$: Observable<number>
  countLow$: Observable<number>
  percentage$: Observable<number>
  diagramDoughnut$: Observable<Diagram[]>
  diagramBarWeek$: Observable<TimeDayDiagram[]>
  diagramBarMonth$: Observable<any[]>
  countAllDays$: Observable<number>
  activeWeek$: Observable<StatisticData[]>
  currentlyDiagram$: Observable<StatisticData[]>

  isWeek: boolean = false
  title: string = 'Progress'


  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.allWords$ = this.store.select(DataSelectorsWords.getLengthAllWords)
    this.countHigh$ = this.store.select(DataSelectorsWords.getCountHighOfWords)
    this.countMiddle$ = this.store.select(DataSelectorsWords.getCountMiddleOfWords)
    this.countLow$ = this.store.select(DataSelectorsWords.getCountLowOfWords)
    this.percentage$ = this.store.select(DataSelectorsWords.getPercentage)
    this.diagramDoughnut$ = this.store.select(DataSelectorsWords.getObjectDiagram)
    this.countAllDays$ = this.store.select(ProgressSelectors.getCountAllDayOfProgress)
    this.activeWeek$ = this.store.select(ProgressSelectors.getActiveWeekProgress)
    this.currentlyDiagram$ = this.store.select(ProgressSelectors.getActiveWeekProgress)

  }

  changeDiagram(event: MatButtonToggleChange) {

    switch (event.value) {
      case 'week':
        this.currentlyDiagram$ = this.store.select(ProgressSelectors.getActiveWeekProgress)
        break

      case 'month':
        this.currentlyDiagram$ = this.store.select(ProgressSelectors.getMonthTimeDays)
        break
      case 'weeks':
        this.currentlyDiagram$ = this.store.select(ProgressSelectors.selectTotalProgressByWeek)
        break
      case 'months':
        this.currentlyDiagram$ = this.store.select(ProgressSelectors.selectMonthlyData)
        break
      default:
        this.currentlyDiagram$ = this.store.select(ProgressSelectors.getActiveWeekProgress)
    }


  }
}
