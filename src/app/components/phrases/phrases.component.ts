import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {TopicPhrases} from 'src/app/models/data';
import {map, Observable, switchMap} from "rxjs";
import {DataSelectorsPhrases,} from "../../store/data/selectors-phrases";
import {ActivatedRoute} from "@angular/router";
import {DataSelectorsWords} from "../../store/data/selectors";

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PhrasesComponent implements OnInit{
  arrPhrases$: Observable< TopicPhrases[] >

  isLoading$:Observable<boolean>
  isError$:Observable<any>

  constructor(private store: Store,
              private route:ActivatedRoute
              ) {}

  ngOnInit(): void {
    this.arrPhrases$=this.route.queryParams.pipe(
      map(queryParams =>queryParams['query']),
      switchMap(queryParams =>this.store.select(DataSelectorsPhrases.getAllDataOfPhrasesOrSentence(queryParams))),
    )
    this.isLoading$=this.store.select(DataSelectorsWords.isLoadingData)
    this.isError$=this.store.select(DataSelectorsWords.isErrorLoadData)
  }

}
