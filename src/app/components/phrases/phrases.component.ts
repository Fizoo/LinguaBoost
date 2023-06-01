import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {TopicPhrases} from 'src/app/models/data';
import {DataSelectors} from "../../store/data/selectors";
import {Observable} from "rxjs";

@Component({
  selector: 'app-phrases',
  templateUrl: './phrases.component.html',
  styleUrls: ['./phrases.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PhrasesComponent {
  arrPhrases: Observable< TopicPhrases[] >

  constructor(private store: Store) {
   this.arrPhrases= this.store.select(DataSelectors.getAllDataOfPhrases)
  }

}
