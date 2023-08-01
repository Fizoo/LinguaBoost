import {Component, Input} from '@angular/core';
import {CollectTopic} from "../../../../../models/data";
import {Store} from "@ngrx/store";
import {DataActions} from "../../../../../store/data/actions";

@Component({
  selector: 'app-d-s-list',
  templateUrl: './d-s-list.component.html',
  styleUrls: ['./d-s-list.component.scss']
})
export class DSListComponent {
  @Input() topic:CollectTopic

  constructor(private store:Store,

              ) {
  }

  deleteTopic(topic: CollectTopic) {
    this.store.dispatch(DataActions.deleteTopicById({topic}))
  }


}
