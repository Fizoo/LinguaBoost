import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {TopicPhrases} from 'src/app/models/data';
import {map, Observable, switchMap} from "rxjs";
import {DataSelectorsPhrases,} from "../../store/data/selectors-phrases";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PhrasesComponent {
  arrPhrases: Observable< TopicPhrases[]  >

  constructor(private store: Store,
              private route:ActivatedRoute
              ) {
    this.arrPhrases=this.route.queryParams.pipe(
      map(queryParams =>queryParams['query']),
      switchMap(queryParams =>this.store.select(DataSelectorsPhrases.getAllDataOfPhrasesOrSentence(queryParams))),
    )
   //this.arrPhrases= this.store.select(DataSelectorsPhrases.getAllDataOfPhrases)
  }

}
