import {Component, Input} from '@angular/core';
import {CollectTopicItem} from "../../../../../models/data";

@Component({
  selector: 'app-d-c-list',
  templateUrl: './d-c-list.component.html',
  styleUrls: ['./d-c-list.component.scss']
})
export class DCListComponent {
  @Input() item:CollectTopicItem

}
