import {Component, Input} from '@angular/core';
import {CollectTopic} from "../../../../../models/data";

@Component({
  selector: 'app-d-s-list',
  templateUrl: './d-s-list.component.html',
  styleUrls: ['./d-s-list.component.scss']
})
export class DSListComponent {
  @Input() topic:CollectTopic

}
