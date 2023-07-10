import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, Subject, switchMap, takeUntil} from "rxjs";
import {DataSelectorsWords} from "../../../../store/data/selectors";
import {CollectTopic, CollectTopicItem} from "../../../../models/data";

@Component({
  selector: 'app-dashboard-content',
  templateUrl: './dashboard-content.component.html',
  styleUrls: ['./dashboard-content.component.scss'],

})
export class DashboardContentComponent implements OnInit,OnDestroy{
  @Input()  listThemes:CollectTopic[]|null=[]

  list:CollectTopicItem[]=[]
  private unsubscribe$=new Subject<void>();

  constructor(private route: ActivatedRoute,
              private store:Store) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => params['id']),
      map(id=> {
       const type= this.route.snapshot.url[0].path
        return { id, type }
      }),
      switchMap(({id,type}) =>this.store.select(DataSelectorsWords.getListForDashboard(id,type))),
      takeUntil(this.unsubscribe$)
    ).subscribe(data=> {
      this.list = data.data
    })
  }

  trackByFn(index:number,item:CollectTopicItem){
  return item.id
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

}
