import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, Observable, switchMap} from "rxjs";
import {DataSelectorsWords} from "../../../store/data/selectors";
import {CollectTopic} from "../../../models/data";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit{
  list$:Observable< CollectTopic[]>

  constructor(private store: Store,
              private route: ActivatedRoute) {}

  ngOnInit(): void {

   this.list$=  this.route.params.pipe(
      map(params => params['id']),
      map(id => {
        const type = this.route.snapshot.url[0].path; // Отримати тип ('word' або 'phrase')
        return { id, type }
      }),
      switchMap(({id, type})=>this.store.select(DataSelectorsWords.getAllDataForDashboard(id,type))),
    )
  }

}
