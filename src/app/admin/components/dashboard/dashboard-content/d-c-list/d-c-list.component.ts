import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CollectTopicItem} from "../../../../../models/data";

@Component({
  selector: 'app-d-c-list',
  templateUrl: './d-c-list.component.html',
  styleUrls: ['./d-c-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class DCListComponent {
  @Input() item:CollectTopicItem
  @Output() deleteItem=new EventEmitter<CollectTopicItem>()

  delete(item:CollectTopicItem) {
    this.deleteItem.emit(item)

  }
}
